import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { NotificationsModule } from '../src/notifications/notifications.module';

import { NotificationStatus } from '../src/notifications/models/notification.model';
import {
  NOTIFICATION_REPOSITORY,
  USER_REPOSITORY,
} from '../src/common/constants/tokens.constant';

describe('POST /notify (e2e)', () => {
  let app: INestApplication;
  const notificationRepository = { create: jest.fn() };
  const userRepository = { findById: jest.fn() };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [NotificationsModule],
    })
      .overrideProvider(NOTIFICATION_REPOSITORY)
      .useValue(notificationRepository)
      .overrideProvider(USER_REPOSITORY)
      .useValue(userRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => app.close());
  afterEach(() => jest.clearAllMocks());

  it('returns 202 with a notificationId for a valid payload', async () => {
    userRepository.findById.mockResolvedValue({ id: 'user-uuid-1' });
    notificationRepository.create.mockResolvedValue({
      id: 'notif-uuid-1',
      status: NotificationStatus.PENDING,
    });

    const response = await request(app.getHttpServer())
      .post('/notify')
      .send({
        userId: 'user-uuid-1',
        content: 'Your order has shipped!',
        channel: ['IN-APP', 'E-MAIL'],
      })
      .expect(202);

    expect(response.body).toEqual({
      status: 'success',
      message: 'Notification accepted for processing',
      notificationId: 'notif-uuid-1',
    });
  });

  it('returns 400 for an invalid channel enum value', async () => {
    await request(app.getHttpServer())
      .post('/notify')
      .send({
        userId: 'user-uuid-1',
        content: 'Test',
        channel: ['CARRIER-PIGEON'],
      })
      .expect(400);
  });

  it('returns 404 when the user does not exist', async () => {
    userRepository.findById.mockResolvedValue(null);

    await request(app.getHttpServer())
      .post('/notify')
      .send({
        userId: 'user-uuid-1',
        content: 'Test',
        channel: ['SMS'],
      })
      .expect(404);
  });
});
