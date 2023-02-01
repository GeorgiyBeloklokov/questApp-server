import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
  readonly email: string;
  @ApiProperty({ example: '6515', description: 'User password' })
  readonly password: string;
}
