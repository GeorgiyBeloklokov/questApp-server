import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  @ApiProperty({
    example: 'Bad behavior in web',
    description: 'Reason of ban for user',
  })
  readonly banReason: string;

  @ApiProperty({
    example: 5,
    description: 'Value of userId, should be a number',
  })
  readonly userId: number;
}
