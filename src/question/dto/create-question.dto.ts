import { ApiProperty } from '@nestjs/swagger';
export class CreateQuestionDto {
  @ApiProperty({
    example: 4,
    description: 'id of user question',
  })
  readonly id: number;

  @ApiProperty({
    example: 'Bill Gates',
    description: 'Description of question',
  })
  readonly description: string;

  @ApiProperty({
    example: 'dfbggrgsgfb.jpg',
    description: 'Link of image',
  })
  readonly image: string;

  @ApiProperty({
    example: 5,
    description: 'id of user for add post',
  })
  readonly userId: number;
}
