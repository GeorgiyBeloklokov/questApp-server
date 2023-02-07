import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Answer } from './answer.model';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Injectable()
export class AnswerService {
  constructor(@InjectModel(Answer) private answerRepository: typeof Answer) {}
  async createAnswer(dto: CreateAnswerDto) {
    const answer = await this.answerRepository.create(dto);
    return answer;
  }

  async getAnswerByValue(title: string) {
    const answer = await this.answerRepository.findOne({ where: { title } });
    return answer;
  }

  async getAnswers() {
    const questions = await this.answerRepository.findAll({ include: { all: true } });
    return questions;
  }
}
