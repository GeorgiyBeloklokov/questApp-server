import { User } from 'src/users/users.model';
import { UsersService } from './../users/users.service';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  @ApiProperty({
    name: 'token',
    example: 'dfbgdfbgrgbfgbfgfrgbffgbergfer',
    description: 'token',
  })
  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  @ApiProperty({
    name: 'token',
    example: 'dfbgdfbgrgbfgbfgfrgbffgbergfer',
    description: 'token',
  })
  async registration(userDto: CreateUserDto, newUserRole: string) {
    const candidate = await this.userService.getUsersByEmail(userDto.email);
    if (candidate) {
      throw new HttpException('User whit this email already exist', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUsers(
      {
        ...userDto,
        password: hashPassword,
      },
      newUserRole
    );
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
    };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUsersByEmail(userDto.email);

    const passwordEquals = await bcrypt.compare(userDto.password, user.password);

    console.log(`passwordEquals =>>>>>>>>>>>>>>>`, passwordEquals, userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    return user;
    throw new UnauthorizedException({ message: 'Wrong email or password' });
  }
}
