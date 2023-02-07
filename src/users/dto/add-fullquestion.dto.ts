import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddFullQuestionDto {
  @ApiProperty({
    example: 'Bill Gates',
    description: 'Title of question',
  })
  @IsString({ message: 'Should be a string' })
  readonly titleQuestion: string;

  @ApiProperty({
    example: 'Hello everyone ...',
    description: 'Description of question',
  })
  @IsString({ message: 'Should be a string' })
  readonly textQuestion: string;

  @ApiProperty({
    example: 'Bill gates says..',
    description: 'Title of answer, should be a string',
  })
  readonly titleAnswer: string;

  @ApiProperty({
    example: 'true',
    description: 'Value of response answer, should be a boolean',
  })
  readonly isCorrect: boolean;

  @ApiProperty({
    example: 5,
    description: 'id of user for add question',
  })
  @IsNumber({}, { message: 'Should de a number' })
  readonly userId: number;
}
