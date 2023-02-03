import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    example: 'Bill Gates',
    description: 'Title of post',
  })
  readonly title: string;

  @ApiProperty({
    example: 'Hello everyone ...',
    description: 'Content of post',
  })
  readonly content: string;

  @ApiProperty({
    example: 5,
    description: 'id of user for add post',
  })
  readonly userId: number;
}
