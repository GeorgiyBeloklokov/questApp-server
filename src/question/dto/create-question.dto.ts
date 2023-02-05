import { ApiProperty } from '@nestjs/swagger';
export class CreateQuestionDto {
  @ApiProperty({
    example: 'Bill Gates',
    description: 'Title of question',
  })
  readonly title: string;

  @ApiProperty({
    example: 'Hello everyone ...',
    description: 'Description of question',
  })
  readonly description: string;
}
