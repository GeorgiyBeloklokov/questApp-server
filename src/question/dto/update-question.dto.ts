import { ApiProperty } from '@nestjs/swagger';
export class UpdateQuestionDto {
  @ApiProperty({
    example: 'Bill Gates',
    description: 'Description of question',
  })
  readonly description: string;

  @ApiProperty({
    example: 'Hello everyone ...',
    description: 'Link of image',
  })
  readonly image: string;
}
