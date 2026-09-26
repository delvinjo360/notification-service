import {
  Model,
  ModelCtor,
  FindOptions,
  CreationAttributes,
  WhereOptions,
} from 'sequelize';

export interface IRepository<T extends Model> {
  create(data: CreationAttributes<T>): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(options?: FindOptions<T>): Promise<T[]>;
  findOne(where: WhereOptions<T>): Promise<T | null>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}

export abstract class BaseRepository<
  T extends Model,
> implements IRepository<T> {
  protected constructor(protected readonly model: ModelCtor<T>) {}

  async create(data: CreationAttributes<T>): Promise<T> {
    return this.model.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findByPk(id);
  }

  async findAll(options?: FindOptions<T>): Promise<T[]> {
    return this.model.findAll(options);
  }

  async findOne(where: WhereOptions<T>): Promise<T | null> {
    return this.model.findOne({ where });
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const record = await this.findById(id);
    if (!record) return null;
    return record.update(data);
  }

  async delete(id: string): Promise<boolean> {
    const deletedCount = await this.model.destroy({
      where: { id } as unknown as WhereOptions<T>,
    });
    return deletedCount > 0;
  }
}
