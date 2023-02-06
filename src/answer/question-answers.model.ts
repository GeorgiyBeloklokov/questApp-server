import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Question } from 'src/question/question.model';
import { User } from 'src/users/users.model';
import { Answer } from './answer.model';

@Table({ tableName: 'questions_answers', createdAt: false, updatedAt: false })
export class QuestionAnswers extends Model<QuestionAnswers> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Answer)
  @Column({
    type: DataType.INTEGER,
  })
  answerId: number;

  @ForeignKey(() => Question)
  @Column({
    type: DataType.INTEGER,
  })
  questionId: number;
}
