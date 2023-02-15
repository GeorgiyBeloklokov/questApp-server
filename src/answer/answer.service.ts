import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Answer } from './answer.model';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Injectable()
export class AnswerService {
  constructor(@InjectModel(Answer) private answerRepository: typeof Answer) {}

  async createAnswer(dto: CreateAnswerDto[]) {
    dto.map(async (item) => {
      const answer = await this.answerRepository.create({
        title: item.title,
        isCorrect: item.isCorrect,
        userId: item.userId,
        questionId: item.questionId,
      });
      await answer.save();
      return answer;
    });
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
