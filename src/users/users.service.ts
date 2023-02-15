import { QuestionService } from './../question/question.service';
import { HttpException } from '@nestjs/common/exceptions';
import { BanUserDto } from './dto/ban-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleService } from 'src/role/role.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './users.model';
import { AddQuestionDto } from './dto/add-question.dto';
import { AddAnswerDto } from './dto/add-answer.dto';
import { AnswerService } from 'src/answer/answer.service';
import { UpdateQuestionDto } from 'src/question/dto/update-question.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RoleService,
    private questionService: QuestionService,
    private answerService: AnswerService
  ) {}
  async createUsers(dto: CreateUserDto, newUserRole: string) {
    const hashPassword = await bcrypt.hash(dto.password, 3);
    const user = await this.userRepository.create({
      ...dto,
      password: hashPassword,
    });
    const role = await this.roleService.getRoleByValue(newUserRole);
    if (role) {
      await user.$set('roles', [role.id]);
      user.roles = [role];
      user.password = hashPassword;
      return user;
    } else {
      const role = await this.roleService.createRole({
        value: newUserRole,
        description: newUserRole,
      });
      await user.$set('roles', [role.id]);
      user.roles = [role];
      user.password = hashPassword;
      return user;
    }
  }

  async getAllUsers() {
    const user = await this.userRepository.findAll({ include: { all: true } });
    return user;
  }

  async getAllQuestions() {
    const questions = await this.questionService.getQuestions();
    return questions;
  }
  async getAllAnswers() {
    const answers = await this.answerService.getAnswers();
    return answers;
  }

  async getUsersByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add('role', role.id);

      return { ...dto, description: role.description };
    }
    throw new HttpException('User or role not exist', HttpStatus.NOT_FOUND);
  }

  /* async addAnswer(dto: AddAnswerDto[]) {
    dto.map(async (item) => {
      const user = await this.userRepository.findByPk(item.userId); */
  //const answer = await this.answerService.getAnswerByValue(item.title);

  /* if (answer && user) {
        await user.$add('answer', answer.id);
        await user.save();
        return dto;
      } else if */ /* if (user) {
        const newAnswer = await this.answerService.createAnswer({ title: item.title, isCorrect: item.isCorrect });
        console.log(`test newAnswer =>>>>>>`, newAnswer);
        await user.$add('questions', newAnswer.id);
        await user.save();
        return dto;
      }
      throw new HttpException('User or answer not exist', HttpStatus.NOT_FOUND);
    });
  } */

  /* async addQuestion(dto: AddQuestionDto, image) {
    const user = await this.userRepository.findByPk(dto.userId);
    const question = await this.questionService.getQuestionByTitle(dto.description);

    if (question && user) {
      await user.$add('questions', question.id);
      return dto;
    } else if (!question && user) {
      const newQuestion = await this.questionService.create({ image: dto.image, description: dto.description }, image);
      await user.$add('questions', newQuestion.id);
      return dto;
    }
    throw new HttpException('User or question not exist', HttpStatus.NOT_FOUND);
  } */

  /* async addQuestion(dto: AddQuestionDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const question = await this.questionService.getQuestionByTitle(dto.description);

    if (question && user) {
      await user.$add('questions', question.id);
      return dto;
    } else if (!question && user) {
      const newQuestion = await this.questionService.createQuestion({ image: dto.image, description: dto.description });
      await user.$add('questions', newQuestion.id);
      return dto;
    }
    throw new HttpException('User or question not exist', HttpStatus.NOT_FOUND);
  } */
  /*  async addQuestion(dto: AddQuestionDto[]) {
    dto.map(async (item) => {
      const user = await this.userRepository.findByPk(item.userId);

      if (user) {
        const question = await this.questionService.createQuestion({
          image: item.image,
          description: item.description,
        });

        await user.$add('questions', question.id);
        await user.save();
        return dto;
      }
      throw new HttpException('User not exist', HttpStatus.NOT_FOUND);
    });

    
  } */

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException('User not exist', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }

  /* async updateQuestion(email: string, questionId: string, dto: UpdateQuestionDto) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });

    const currentQuestion = user.questions.find((item) => item.id === Number(questionId));
    if (!currentQuestion) {
      throw new HttpException('Question was not founded!', HttpStatus.NOT_FOUND);
    }

    currentQuestion.description = dto.description;
    currentQuestion.image = dto.image;

    const data = await currentQuestion.save();

    return data;
  } */
}
