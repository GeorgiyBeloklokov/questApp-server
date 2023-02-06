import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { AnswerController } from './answer.controller';
import { Answer } from './answer.model';
import { AnswerService } from './answer.service';
import { QuestionAnswers } from './user-answers.model';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
  imports: [SequelizeModule.forFeature([Answer, QuestionAnswers, User])],
  exports: [AnswerService],
})
export class AnswerModule {}
