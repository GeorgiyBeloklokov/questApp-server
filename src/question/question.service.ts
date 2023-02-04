import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateQuestionDto } from './dto/create-question.dto';

import { Question } from './question.model';

@Injectable()
export class QuestionService {
  constructor(@InjectModel(Question) private questionRepository: typeof Question, private fileService: FilesService) {}
  async create(dto: CreateQuestionDto, image: any) {
    if (image) {
      const fileName = await this.fileService.createFile(image);
      const question = await this.questionRepository.create({
        ...dto,
        image: fileName,
      });
      return question;
    } else {
      const question = await this.questionRepository.create(dto);
      return question;
    }
  }

  async getQuestionByTitle(title: string) {
    const question = await this.questionRepository.findOne({ where: { title } });
    return question;
  }
}
