import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AnswerService } from 'src/answer/answer.service';
import { FilesService } from 'src/files/files.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './question.model';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question) private questionRepository: typeof Question,
    private fileService: FilesService,
    private answerService: AnswerService
  ) {}
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

  async createQuestion(dto: CreateQuestionDto[]) {
    dto.map(async (item) => {
      const question = await this.questionRepository.findByPk(item.id);
      if (!question) {
        const question = await this.questionRepository.create({
          description: item.description,
          image: item.image,
          userId: item.userId,
        });
        await question.save();
        return question;
      }
      question.image = item.image;
      question.description = item.description;
      question.userId = item.userId;
      question.id = item.id;
      await question.save();
      return question;
    });
  }

  async createOneQuestion(dto: CreateQuestionDto) {
    const question = await this.questionRepository.findByPk(dto.id);

    if (!question) {
      const question = await this.questionRepository.create({
        description: '',
        image: '',
        userId: dto.userId,
      });
      await question.save();
      return question;
    }
    question.image = dto.image;
    question.description = dto.description;
    question.userId = dto.userId;
    question.id = dto.id;
    await question.save();
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

  async deleteQuestionById(id: number) {
    const question = await this.questionRepository.findByPk(id);
    await this.answerService.destroyAnswersByQuestionId(id);
    await question.destroy();
    return question;
  }
}
