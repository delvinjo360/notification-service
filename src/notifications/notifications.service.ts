import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IRepository } from '../common/database/base.repository';
import { Notification, NotificationStatus } from './models/notification.model';
import { User } from '../users/models/user.model';
import { CreateNotificationDto } from './dto/create-notification.dto';
import {
  NOTIFICATION_REPOSITORY,
  USER_REPOSITORY,
} from '../common/constants/tokens.constant';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationRepository: IRepository<Notification>,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IRepository<User>,
  ) {}

  async create(dto: CreateNotificationDto): Promise<Notification> {
    const user = await this.userRepository.findById(dto.userId);
    if (!user) {
      throw new NotFoundException(`User with id ${dto.userId} not found`);
    }

    return this.notificationRepository.create({
      content: dto.content,
      userId: dto.userId,
      channel: dto.channel,
      status: NotificationStatus.PENDING,
    } as any); // see note below on the `as any`
  }
}
