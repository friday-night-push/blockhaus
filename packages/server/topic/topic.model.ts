import { Model, Table, DataType, Column, Length } from 'sequelize-typescript';

export interface TopicCreationAttributes {
  name: string;
}

@Table({ tableName: 'topics' })
export class TopicModel extends Model<TopicModel, TopicCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Length({ min: 1, msg: 'TopicModel name must be at least 1 character long' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
}
