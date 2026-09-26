import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

import {
  NotificationChannel,
  NotificationStatus,
} from './models/notification.model';
import {
  NOTIFICATION_REPOSITORY,
  USER_REPOSITORY,
} from '../common/constants/tokens.constant';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let notificationRepository: { create: jest.Mock; findById: jest.Mock };
  let userRepository: { findById: jest.Mock };

  beforeEach(async () => {
    notificationRepository = { create: jest.fn(), findById: jest.fn() };
    userRepository = { findById: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        { provide: NOTIFICATION_REPOSITORY, useValue: notificationRepository },
        { provide: USER_REPOSITORY, useValue: userRepository },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    const dto = {
      userId: 'user-uuid-1',
      content: 'Your order has shipped!',
      channel: [NotificationChannel.IN_APP, NotificationChannel.EMAIL],
    };

    it('throws NotFoundException when the user does not exist', async () => {
      userRepository.findById.mockResolvedValue(null);

      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
      expect(notificationRepository.create).not.toHaveBeenCalled();
    });

    it('creates a notification with PENDING status when the user exists', async () => {
      userRepository.findById.mockResolvedValue({ id: dto.userId });
      const createdNotification = {
        id: 'notif-uuid-1',
        ...dto,
        status: NotificationStatus.PENDING,
      };
      notificationRepository.create.mockResolvedValue(createdNotification);

      const result = await service.create(dto);

      expect(userRepository.findById).toHaveBeenCalledWith(dto.userId);
      expect(notificationRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          content: dto.content,
          userId: dto.userId,
          channel: dto.channel,
          status: NotificationStatus.PENDING,
        }),
      );
      expect(result).toEqual(createdNotification);
    });
  });
});
