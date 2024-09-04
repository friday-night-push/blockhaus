import { Model, Table, DataType, Column } from 'sequelize-typescript';

export interface TopicCreationAttributes {
  name: string;
}

@Table({ tableName: 'topics' })
export class Topic extends Model<Topic, TopicCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
}
