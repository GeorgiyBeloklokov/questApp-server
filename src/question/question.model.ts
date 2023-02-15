import { Answer } from './../answer/answer.model';
import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';

import { User } from 'src/users/users.model';
import { UserQuestions } from './user-questions.model';

interface QuestionCreationAttrs {
  description: string;
  image: string;
  userId: number;
}

@Table({ tableName: 'questions', createdAt: false, updatedAt: false })
export class Question extends Model<Question, QuestionCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique id of question' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  /*   @ApiProperty({
    example: 'Question one ..',
    description: 'Title of question',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  title: string; */

  @ApiProperty({
    example: 'What is ...',
    description: 'Description of question',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @ApiProperty({
    example: '3b830bd6-81e5-41e2-99a0-f84e038d153b.jpg',
    description: 'Image in jpg',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image: string;

  /* @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @ForeignKey(() => Answer)
  @Column({
    type: DataType.INTEGER,
  })
  questionId: number;

  @HasMany(() => Answer)
  answers: Answer[]; */

  /*  @BelongsToMany(() => User, () => UserQuestions)
  users: User[]; */

  @ApiProperty({
    example: 'userId',
    description: 'id of user',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User) // one to many
  author: User;
}
