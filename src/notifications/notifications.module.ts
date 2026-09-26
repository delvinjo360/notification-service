import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Notification } from './models/notification.model';
import { NotificationRepository } from './repositories/notification.repository';
import { UsersModule } from '../users/users.module';
import { NOTIFICATION_REPOSITORY } from 'src/common/constants/tokens.constant';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([Notification]),
    UsersModule, // gives access to USER_REPOSITORY, since the service will need to validate user_id exists
  ],
  controllers: [NotificationsController],
  providers: [
    NotificationRepository,
    { provide: NOTIFICATION_REPOSITORY, useExisting: NotificationRepository },
    NotificationsService,
  ],
  exports: [NOTIFICATION_REPOSITORY],
})
export class NotificationsModule {}
