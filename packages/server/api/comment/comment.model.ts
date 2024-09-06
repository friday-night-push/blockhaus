import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import type { CreateCommentDto } from './comment.dto';
import { TopicModel } from '../topic';

@Table({ tableName: 'comments' })
export class CommentModel extends Model<CommentModel, CreateCommentDto> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @ForeignKey(() => TopicModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  topicId: number;

  @BelongsTo(() => TopicModel)
  topic: TopicModel;
}
