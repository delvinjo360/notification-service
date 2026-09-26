import { Column, DataType, Table, HasMany } from 'sequelize-typescript';
import { BaseModel } from '../../common/database/base.model';
import { Notification } from '../../notifications/models/notification.model';

@Table({ tableName: 'users', timestamps: true, underscored: true })
export class User extends BaseModel<User> {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  userId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: true })
  phone: string;

  @Column({ type: DataType.STRING, allowNull: true, field: 'device_token' })
  deviceToken: string;

  @HasMany(() => Notification)
  notifications: Notification[];
}
