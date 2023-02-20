import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { Roles } from 'src/auth/roles-auth.decorator';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Role } from 'src/role/role.model';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { RolesGuard } from './../auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';
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
