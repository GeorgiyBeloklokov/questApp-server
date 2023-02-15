import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { UsersService } from 'src/users/users.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './question.model';
import { UserQuestions } from './user-questions.model';

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

  async createQuestion(dto: CreateQuestionDto) {
    const question = await this.questionRepository.create(dto);
    /* if (!question) {
      throw new HttpException('Error of create question!', HttpStatus.NOT_IMPLEMENTED);
    } */
    return question;
  }

  async getQuestionByTitle(description: string) {
    const question = await this.questionRepository.findOne({ where: { description } });
    /* if (!question) {
      throw new HttpException('Error of find question!', HttpStatus.NOT_FOUND);
    } */
    return question;
  }

  async getQuestions() {
    const questions = await this.questionRepository.findAll({ include: { all: true } });
    /* if (!questions) {
      throw new HttpException('Error of find question!', HttpStatus.NOT_FOUND);
    } */
    return questions;
  }
}
