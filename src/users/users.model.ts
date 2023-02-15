import { Answer } from 'src/answer/answer.model';
import { UserQuestions } from './../question/user-questions.model';
import { Question } from './../question/question.model';
import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Post } from 'src/posts/posts.model';
import { Role } from 'src/role/role.model';
import { UserRoles } from 'src/role/user-roles.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users', createdAt: false, updatedAt: false })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({
    example: '$2a$05$7JXCJoVfMRRYHSDcabE8feYODKTmZ9n14Emnrz/Et5BMAG5ie66w.',
    description: 'Encrypted user password',
  })
  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: 'true', description: 'Baned' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: boolean;

  @ApiProperty({ example: 'Bad behavior in web', description: 'Reason' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles) //many to many
  roles: Role[];

  /*  @BelongsToMany(() => Question, () => UserQuestions) //many to many
  questions: Question[]; */

  /*  @ForeignKey(() => Answer)
  @Column({
    type: DataType.INTEGER,
  })
  answerId: number; */

  @HasMany(() => Post)
  posts: Post[];

  @HasMany(() => Question)
  questions: Question[];

  @HasMany(() => Answer)
  answers: Answer[];
}
