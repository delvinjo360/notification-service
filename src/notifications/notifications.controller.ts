import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notify')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async create(@Body() dto: CreateNotificationDto) {
    const notification = await this.notificationsService.create(dto);

    return {
      status: 'success',
      message: 'Notification accepted for processing',
      notificationId: notification.id,
    };
  }
}
