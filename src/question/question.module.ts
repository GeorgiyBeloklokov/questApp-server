import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Answer } from 'src/answer/answer.model';
import { AnswerModule } from 'src/answer/answer.module';
import { FilesModule } from 'src/files/files.module';
import { User } from 'src/users/users.model';
import { QuestionController } from './question.controller';
import { Question } from './question.model';
import { QuestionService } from './question.service';

@Module({
  providers: [QuestionService],
  controllers: [QuestionController],
  imports: [SequelizeModule.forFeature([Question, User, Answer]), FilesModule, AnswerModule],
  exports: [QuestionService],
})
export class QuestionModule {}
