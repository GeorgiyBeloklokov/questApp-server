import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({
    example: 'admin',
    description: 'Role of user, admin or user, should be a string',
  })
  @IsString({ message: 'Should be a string' })
  readonly value: string;

  @ApiProperty({
    example: 5,
    description: 'Value of userId, should be a number',
  })
  @IsNumber({}, { message: 'Should de a number' })
  readonly userId: number;
}
