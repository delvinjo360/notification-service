import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from '../../common/database/base.repository';
import { Notification } from '../models/notification.model';

@Injectable()
export class NotificationRepository extends BaseRepository<Notification> {
  constructor(@InjectModel(Notification) model: typeof Notification) {
    super(model);
  }
}
