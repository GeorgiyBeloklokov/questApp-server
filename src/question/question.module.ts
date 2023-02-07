import { Answer } from 'src/answer/answer.model';
import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './question.model';
import { User } from 'src/users/users.model';
import { UserQuestions } from './user-questions.model';
import { FilesModule } from 'src/files/files.module';
import { QuestionAnswers } from 'src/answer/user-answers.model';
import { AnswerModule } from 'src/answer/answer.module';

@Module({
  providers: [QuestionService],
  controllers: [QuestionController],
  imports: [SequelizeModule.forFeature([Question, User, UserQuestions]), FilesModule],
  exports: [QuestionService],
})
export class QuestionModule {}
