import type { IRepository } from '../common/database/base.repository';
import { Notification } from './models/notification.model';
import { User } from '../users/models/user.model';
import { CreateNotificationDto } from './dto/create-notification.dto';
export declare class NotificationsService {
    private readonly notificationRepository;
    private readonly userRepository;
    constructor(notificationRepository: IRepository<Notification>, userRepository: IRepository<User>);
    create(dto: CreateNotificationDto): Promise<Notification>;
}
