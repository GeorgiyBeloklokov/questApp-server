import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Question } from 'src/question/question.model';
import { User } from 'src/users/users.model';

interface PostCreationAttrs {
  title: string;
  isCorrect: boolean;
}

@Table({ tableName: 'answers', createdAt: false, updatedAt: false })
export class Answer extends Model<Answer, PostCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique id of post' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Bill Gates', description: 'Title of answer' })
  @Column({
    type: DataType.STRING,
    //unique: true,
    //allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: 'true',
    description: 'Is correct answer',
  })
  @Column({
    type: DataType.BOOLEAN,
    //allowNull: false,
  })
  isCorrect: boolean;

  @ApiProperty({
    example: '2',
    description: 'questionId',
  })
  @ForeignKey(() => Question)
  @Column({
    type: DataType.INTEGER,
  })
  questionId: number;

  @ApiProperty({
    example: '3',
    description: 'userId',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User) // one to many
  author: User;
}
