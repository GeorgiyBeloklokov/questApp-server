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

  async getRoleByValue(value: string) {
    //console.log(`value =>>>>>>>>>>>`, value);
    const answer = await this.answerRepository.findOne({ where: { value } });
    return answer;
  }
}
