import { NotificationChannel } from '../models/notification.model';
export declare class CreateNotificationDto {
    userId: string;
    content: string;
    channel: NotificationChannel[];
}
