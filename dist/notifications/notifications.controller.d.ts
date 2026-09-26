import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    create(dto: CreateNotificationDto): Promise<{
        status: string;
        message: string;
        notificationId: string;
    }>;
}
