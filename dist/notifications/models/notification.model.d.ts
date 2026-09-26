import { BaseModel } from '../../common/database/base.model';
import { User } from '../../users/models/user.model';
export declare enum NotificationChannel {
    IN_APP = "IN-APP",
    EMAIL = "E-MAIL",
    SMS = "SMS",
    PUSH = "PUSH"
}
export declare enum NotificationStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED"
}
export declare class Notification extends BaseModel<Notification> {
    content: string;
    userId: string;
    user: User;
    channel: NotificationChannel[];
    status: NotificationStatus;
}
