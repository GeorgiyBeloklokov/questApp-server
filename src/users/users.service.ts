import { QuestionService } from './../question/question.service';
import { HttpException } from '@nestjs/common/exceptions';
import { BanUserDto } from './dto/ban-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleService } from 'src/role/role.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from './users.model';
import { AddQuestionDto } from './dto/add-question.dto';
import { AddAnswerDto } from './dto/add-answer.dto';
import { AnswerService } from 'src/answer/answer.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RoleService,
    private questionService: QuestionService,
    private answerService: AnswerService
  ) {}
  async createUsers(dto: CreateUserDto, newUserRole: string) {
    const hashPassword = await bcrypt.hash(dto.password, 5);
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
        value: 'admin',
        description: 'Administrator',
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

  async addAnswer(dto: AddAnswerDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const answer = await this.answerService.createAnswer(dto);

    if (answer && user) {
      await user.$add('answer', answer.id);
      return dto;
    }
    throw new HttpException('User or answer not exist', HttpStatus.NOT_FOUND);
  }

  async addQuestion(dto: AddQuestionDto, image) {
    const user = await this.userRepository.findByPk(dto.userId);
    const question = await this.questionService.getQuestionByTitle(dto.title);

    if (question && user) {
      await user.$add('questions', question.id);
      return dto;
    } else if (!question && user) {
      const newQuestion = await this.questionService.create({ title: dto.title, description: dto.description }, image);
      await user.$add('questions', newQuestion.id);
      return dto;
    }
    throw new HttpException('User or question not exist', HttpStatus.NOT_FOUND);
  }

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
}
