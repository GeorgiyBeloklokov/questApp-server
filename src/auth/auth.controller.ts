import { AuthService } from './auth.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: AuthService })
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }
  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({ status: 200, type: AuthService })
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    const newUserRole = 'user';
    return this.authService.registration(userDto, newUserRole);
  }
}
