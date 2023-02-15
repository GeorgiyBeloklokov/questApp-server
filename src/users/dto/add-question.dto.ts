import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddQuestionDto {
  @ApiProperty({
    example: 'Bill Gates',
    description: 'Title of question',
  })
  @IsString({ message: 'Should be a string' })
  readonly description: string;

  @ApiProperty({
    example: 'fdgbrtgbrf351651ergtg.img',
    description: 'Link of image',
  })
  @IsString({ message: 'Should be a string' })
  readonly image: string;

  @ApiProperty({
    example: 3,
    description: 'id of question in user questions',
  })
  @IsString({ message: 'Should be a string' })
  readonly questId: number;

  @ApiProperty({
    example: 5,
    description: 'id of user for add question',
  })
  @IsNumber({}, { message: 'Should de a number' })
  readonly userId: number;
}
