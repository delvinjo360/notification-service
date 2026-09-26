import { Model, ModelCtor, FindOptions, CreationAttributes, WhereOptions } from 'sequelize';
export interface IRepository<T extends Model> {
    create(data: CreationAttributes<T>): Promise<T>;
    findById(id: string): Promise<T | null>;
    findAll(options?: FindOptions<T>): Promise<T[]>;
    findOne(where: WhereOptions<T>): Promise<T | null>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}
export declare abstract class BaseRepository<T extends Model> implements IRepository<T> {
    protected readonly model: ModelCtor<T>;
    protected constructor(model: ModelCtor<T>);
    create(data: CreationAttributes<T>): Promise<T>;
    findById(id: string): Promise<T | null>;
    findAll(options?: FindOptions<T>): Promise<T[]>;
    findOne(where: WhereOptions<T>): Promise<T | null>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}
