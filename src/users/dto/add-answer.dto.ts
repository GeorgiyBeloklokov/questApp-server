import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class AddAnswerDto {
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
  @IsNumber({}, { message: 'Should de a number' })
  readonly userId: number;

  /*@ApiProperty({
    example: 2,
    description: 'id of question for add answer',
  })
  @IsNumber({}, { message: 'Should de a number' })
  readonly questionId: number; */
}
