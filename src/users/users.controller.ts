import { BanUserDto } from './dto/ban-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { RolesGuard } from './../auth/roles.guard';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { Roles } from 'src/auth/roles-auth.decorator';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/role/role.model';
/* import { ValidationPipe } from 'src/pipes/validation.pipe'; */
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Create user with admin role' })
  @ApiResponse({ status: 200, type: User })
  //@UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    const newUserRole = 'admin';
    return this.usersService.createUsers(userDto, newUserRole);
  }

  @ApiOperation({ summary: 'Get users (access only with admin role)' })
  @ApiResponse({ status: 200, type: [User] })
  //@UseGuards(JwtAuthGuard)
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Assignment roles (access only with admin role)' })
  @ApiResponse({ status: 200, type: Role })
  //@UseGuards(JwtAuthGuard)
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
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
}
