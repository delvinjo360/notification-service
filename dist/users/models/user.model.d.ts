import { BaseModel } from '../../common/database/base.model';
import { Notification } from "../../notifications/models/notification.model";
export declare class User extends BaseModel<User> {
    userId: string;
    name: string;
    email: string;
    phone: string;
    deviceToken: string;
    notifications: Notification[];
}
