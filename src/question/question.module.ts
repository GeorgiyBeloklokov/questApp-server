import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { User } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { QuestionController } from './question.controller';
import { Question } from './question.model';
import { QuestionService } from './question.service';
import { UserQuestions } from './user-questions.model';

@Module({
  providers: [QuestionService],
  controllers: [QuestionController],
  imports: [SequelizeModule.forFeature([Question, User, UserQuestions]), FilesModule],
  exports: [QuestionService],
})
export class QuestionModule {}
