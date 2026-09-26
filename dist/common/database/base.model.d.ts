import { Model } from 'sequelize-typescript';
export declare abstract class BaseModel<T extends {}> extends Model<T> {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
