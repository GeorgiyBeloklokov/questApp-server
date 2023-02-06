import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from 'src/question/question.model';
import { AnswerController } from './answer.controller';
import { Answer } from './answer.model';
import { AnswerService } from './answer.service';
import { QuestionAnswers } from './question-answers.model';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
  imports: [SequelizeModule.forFeature([Question, Answer, QuestionAnswers])],
  exports: [AnswerService],
})
export class AnswerModule {}
