import {
  Column,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { BaseModel } from '../../common/database/base.model';
import { User } from '../../users/models/user.model';

export enum NotificationChannel {
  IN_APP = 'IN-APP',
  EMAIL = 'E-MAIL',
  SMS = 'SMS',
  PUSH = 'PUSH',
}

export enum NotificationStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

@Table({ tableName: 'notifications', timestamps: true, underscored: true })
export class Notification extends BaseModel<Notification> {
  @Column({ type: DataType.TEXT, allowNull: false })
  content: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false, field: 'user_id' })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.ARRAY(DataType.ENUM(...Object.values(NotificationChannel))),
    allowNull: false,
  })
  channel: NotificationChannel[];

  @Column({
    type: DataType.ENUM(...Object.values(NotificationStatus)),
    allowNull: false,
    defaultValue: NotificationStatus.PENDING,
  })
  status: NotificationStatus;
}
