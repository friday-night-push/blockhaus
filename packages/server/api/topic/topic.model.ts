import { Model, Table, DataType, Column, HasMany } from 'sequelize-typescript';

import type { CreateTopicDto } from './topic.dto';
import { CommentModel } from '../comment';

@Table({ tableName: 'topics' })
export class TopicModel extends Model<TopicModel, CreateTopicDto> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => CommentModel)
  comments: CommentModel[];
}
