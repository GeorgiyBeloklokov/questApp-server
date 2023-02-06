import { AuthModule } from './../auth/auth.module';
import { User } from './users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Role } from 'src/role/role.model';
import { UserRoles } from 'src/role/user-roles.model';
import { RoleModule } from 'src/role/role.module';
import { Post } from 'src/posts/posts.model';
import { UserQuestions } from 'src/question/user-questions.model';
import { Question } from 'src/question/question.model';
import { QuestionModule } from 'src/question/question.module';
import { Answer } from 'src/answer/answer.model';
import { QuestionAnswers } from 'src/answer/user-answers.model';
import { AnswerModule } from 'src/answer/answer.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, UserQuestions, Post, Question, Answer, QuestionAnswers]),
    RoleModule,
    AnswerModule,
    QuestionModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
