import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { AnswerService } from 'src/answer/answer.service';
import { RoleService } from 'src/role/role.service';
import { QuestionService } from './../question/question.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

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
