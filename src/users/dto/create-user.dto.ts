import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
  @IsString({ message: 'Should be a string' })
  @IsEmail({}, { message: 'Wrong email' })
  readonly email: string;

  @ApiProperty({ example: '6515', description: 'User password' })
  @IsString({ message: 'Should be a string' })
  @Length(4, 16, { message: 'min 4 max 16 characters' })
  readonly password: string;
}
