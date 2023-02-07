import { Answer } from 'src/answer/answer.model';
import { Question } from './../question/question.model';
import { BanUserDto } from './dto/ban-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { RolesGuard } from './../auth/roles.guard';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { Roles } from 'src/auth/roles-auth.decorator';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/role/role.model';
import { AddQuestionDto } from './dto/add-question.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AddAnswerDto } from './dto/add-answer.dto';
import { AddFullQuestionDto } from './dto/add-fullquestion.dto';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private authService: AuthService) {}

  @ApiOperation({ summary: 'Create user with admin role' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    const newUserRole = 'admin';
    return this.usersService.createUsers(userDto, newUserRole);
  }

  @ApiOperation({ summary: 'Get users (access only with auth)' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  //@Roles('admin')
  //@UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Assignment roles (access only with auth and admin role)' }) //(access only with admin role)
  @ApiResponse({ status: 200, type: Role })
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({ summary: 'Assignment question (access only with auth)' }) //(access only with auth)
  @ApiResponse({ status: 200, type: Question })
  @UseGuards(JwtAuthGuard)
  @Post('/question')
  @UseInterceptors(FileInterceptor('image'))
  addQuestion(@Body() dto: AddQuestionDto, @UploadedFile() image) {
    return this.usersService.addQuestion(dto, image);
  }

  @ApiOperation({ summary: 'Assignment answers (access only with auth)' })
  @ApiResponse({ status: 200, type: Answer })
  @UseGuards(JwtAuthGuard)
  //@Roles('admin')
  //@UseGuards(RolesGuard)
  @Post('/answer')
  addAnswer(@Body() dto: AddAnswerDto) {
    return this.usersService.addAnswer(dto);
  }

  @ApiOperation({ summary: 'Ban user (access only with admin role)' })
  @ApiResponse({ status: 200, type: User })
  //@UseGuards(JwtAuthGuard)
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.usersService.ban(dto);
  }

  /* @ApiOperation({ summary: 'Assignment fullquestion (access only with auth)' })
  @ApiResponse({ status: 200, type: AddFullQuestionDto })
  //@UseGuards(JwtAuthGuard)
  @Post('/fullquestion')
  @UseInterceptors(FileInterceptor('image'))
  addFullQuestion(@Body() dto: AddFullQuestionDto, @UploadedFile() image) {
    return this.usersService.addFullQuestion(dto, image);
  } */
}
