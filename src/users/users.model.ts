import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
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
  @ApiProperty({ example: '6515', description: 'User password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
  @ApiProperty({ example: 'true', description: 'Is banned' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: boolean;
  @ApiProperty({ example: 'Code conduct', description: 'Reason' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  banReason: string;
}
