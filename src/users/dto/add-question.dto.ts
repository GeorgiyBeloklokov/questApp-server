import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddQuestionDto {
  @ApiProperty({
    example: 'Bill Gates',
    description: 'Title of question',
  })
  @IsString({ message: 'Should be a string' })
  readonly title: string;

  @ApiProperty({
    example: 'Hello everyone ...',
    description: 'Description of question',
  })
  @IsString({ message: 'Should be a string' })
  readonly description: string;

  @ApiProperty({
    example: 5,
    description: 'id of user for add question',
  })
  @IsNumber({}, { message: 'Should de a number' })
  readonly userId: number;
}
