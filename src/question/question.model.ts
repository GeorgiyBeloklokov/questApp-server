import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Answer } from 'src/answer/answer.model';
import { QuestionAnswers } from 'src/answer/user-answers.model';
import { User } from 'src/users/users.model';
import { UserQuestions } from './user-questions.model';

interface QuestionCreationAttrs {
  title: string;
  description: string;
  image: string;
}

@Table({ tableName: 'questions' })
export class Question extends Model<Question, QuestionCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique id of question' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Question one ..',
    description: 'Title of question',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  title: string;

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

  @BelongsToMany(() => User, () => UserQuestions)
  users: User[];

  /* @BelongsToMany(() => Answer, () => QuestionAnswers) //many to many
  answers: Answer[]; */
}
