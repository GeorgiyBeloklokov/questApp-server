import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from 'src/question/question.model';
import { UserQuestions } from 'src/question/user-questions.model';
import { User } from 'src/users/users.model';
import { AnswerController } from './answer.controller';
import { Answer } from './answer.model';
import { AnswerService } from './answer.service';
import { QuestionAnswers } from './user-answers.model';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
  imports: [SequelizeModule.forFeature([Answer, Question, QuestionAnswers, User, UserQuestions])],
  exports: [AnswerService],
})
export class AnswerModule {}
