import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty({
    example: 'Bill gates says..',
    description: 'Title of answer, should be a string',
  })
  @IsString({ message: 'Should de a string' })
  readonly title: string;

  @ApiProperty({
    example: 'true',
    description: 'Value of response answer, should be a boolean',
  })
  @IsBoolean({ message: 'Should de a boolean' })
  readonly isCorrect: boolean;

  @ApiProperty({
    example: 5,
    description: 'id of user for add answer',
  })
  readonly userId: number;

  @ApiProperty({
    example: 5,
    description: 'id of question for add answer',
  })
  readonly questionId: number;
}
