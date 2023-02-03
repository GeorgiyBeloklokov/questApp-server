import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    example: 'admin',
    description: 'Role of user, admin or user or ..., should be a string',
  })
  readonly value: string;

  @ApiProperty({
    example: 'admin role of user',
    description: 'Value fo userId, should be a number',
  })
  readonly description: string;
}
