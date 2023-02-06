import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { QuestionAnswers } from './user-answers.model';

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

  @BelongsToMany(() => User, () => QuestionAnswers)
  users: User[];
}
