import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IGenericRepository } from './generic.interface';

export class GenericRepository<T extends BaseEntity>
  implements IGenericRepository<T>
{
  constructor(private readonly repository: Repository<T>) {}
  async findAll(options: FindManyOptions<T> = {}): Promise<T[]> {
    return await this.repository.find({
      ...options,
      where: {
        deleted_at: null,
      },
    });
  }

  async findOneBy(options: FindOneOptions<T>): Promise<T> {
    return await this.repository.findOne({
      ...options,
      where: {
        deleted_at: null,
      },
    });
  }

  async save(entity: T): Promise<T> {
    return await this.repository.save(entity);
  }
}
