import { Column, DataType, Model } from 'sequelize-typescript';

export abstract class BaseModel<T extends {}> extends Model<T> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({ field: 'created_at', type: DataType.DATE })
  declare createdAt: Date;

  @Column({ field: 'updated_at', type: DataType.DATE })
  declare updatedAt: Date;
}
