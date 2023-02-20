import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Answer } from './answer.model';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Injectable()
export class AnswerService {
  constructor(@InjectModel(Answer) private answerRepository: typeof Answer) {}

  async createOneAnswer(dto: CreateAnswerDto) {
    const answer = await this.answerRepository.findByPk(dto.id);

    if (!answer) {
      const answer = await this.answerRepository.create({
        title: dto.title,
        isCorrect: dto.isCorrect,
        userId: dto.userId,
        questionId: dto.questionId,
      });
      await answer.save();
      return answer;
    }
    answer.title = dto.title;
    answer.isCorrect = dto.isCorrect;
    answer.userId = dto.userId;
    answer.questionId = dto.questionId;
    answer.id = dto.id;
    await answer.save();
    return answer;
  }

  async deleteAnswer(dto: CreateAnswerDto) {
    const answer = await this.answerRepository.findByPk(dto.id);
    await answer.destroy();
    return answer;
  }

  async deleteAnswerById(id: number) {
    const answer = await this.answerRepository.findByPk(id);
    await answer.destroy();
    return answer;
  }

  async getAnswerByValue(title: string) {
    const answer = await this.answerRepository.findOne({ where: { title } });
    return answer;
  }

  async getAnswers() {
    const answers = await this.answerRepository.findAll({ include: { all: true } });
    return answers;
  }

  async destroyAnswersByQuestionId(id: number) {
    await Answer.destroy({
      where: { questionId: id },
    });
    return 'Done';
  }
}
