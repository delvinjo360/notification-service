import { BaseRepository } from '../../common/database/base.repository';
import { Notification } from '../models/notification.model';
export declare class NotificationRepository extends BaseRepository<Notification> {
    constructor(model: typeof Notification);
}
