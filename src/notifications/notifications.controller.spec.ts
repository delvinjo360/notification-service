import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import {
  NotificationChannel,
  NotificationStatus,
} from './models/notification.model';

describe('NotificationsController', () => {
  let controller: NotificationsController;
  let service: { create: jest.Mock };

  beforeEach(async () => {
    service = { create: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [{ provide: NotificationsService, useValue: service }],
    }).compile();

    controller = module.get<NotificationsController>(NotificationsController);
  });

  it('returns an accepted response shape with the notification id', async () => {
    const dto = {
      userId: 'user-uuid-1',
      content: 'Test content',
      channel: [NotificationChannel.SMS],
    };
    service.create.mockResolvedValue({
      id: 'notif-uuid-1',
      ...dto,
      status: NotificationStatus.PENDING,
    });

    const result = await controller.create(dto as any);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual({
      status: 'success',
      message: 'Notification accepted for processing',
      notificationId: 'notif-uuid-1',
    });
  });
});
