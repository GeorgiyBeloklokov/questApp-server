import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswerDto {
  @ApiProperty({
    example: 'Bill gates says..',
    description: 'Title of answer, should be a string',
  })
  readonly title: string;

  @ApiProperty({
    example: 'true',
    description: 'Value of response answer, should be a boolean',
  })
  readonly isCorrect: boolean;
}
