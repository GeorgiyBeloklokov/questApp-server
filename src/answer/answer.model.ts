import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Question } from 'src/question/question.model';
import { User } from 'src/users/users.model';
import { QuestionAnswers } from './question-answers.model';

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
    unique: true,
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

  /*  @ApiProperty({
    example: 'userId',
    description: 'id of user',
  })
  @ForeignKey(() => Answer)
  @Column({
    type: DataType.INTEGER,
  })
  answerId: number; */

  @BelongsToMany(() => Question, () => QuestionAnswers)
  questions: Question[];
}
