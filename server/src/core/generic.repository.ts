import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { IGenericRepository } from './generic.interface';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { QueryFilterBase } from './base.query';

export class GenericRepository<T extends BaseEntity>
  implements IGenericRepository<T>
{
  constructor(private readonly repository: Repository<T>) {}
  async findOneWithCondition(options: FindOneOptions<T>): Promise<T> {
    return await this.repository.findOne({
      where: {
        ...options.where,
        deleted_at: null,
      },
    });
  }

  async findAll(options: FindManyOptions<T> = {}): Promise<T[]> {
    return await this.repository.find({
      ...options,
      where: {
        ...options.where,
        deleted_at: null,
      },
    });
  }

  async findOneBy(options: FindOneOptions<T>): Promise<T> {
    return await this.repository.findOne({
      ...options,
      where: {
        ...options.where,
        deleted_at: null,
      },
    });
  }

  async findOneByAndUpdate(
    options: FindOneOptions<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    const foundOne = await this.repository.findOne({
      ...options,
      where: {
        ...options.where,
        deleted_at: null,
      },
    });

    if (!foundOne) {
      return null;
    }

    return await this.repository.update(foundOne.id, partialEntity);
  }

  async buildQuery(builder: SelectQueryBuilder<T>, query: QueryFilterBase) {
    if (query.offset) {
      builder.offset(query.limit * (query.offset - 1));
    }

    if (query.limit) {
      builder.limit(query.limit);
    }

    return await builder.getManyAndCount();
  }

  async save(entity: T): Promise<T> {
    return await this.repository.save(entity);
  }

  async update(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ) {
    return await this.repository.update(where, partialEntity);
  }

  async delete(options: FindOptionsWhere<T>) {
    return await this.repository.delete(options);
  }
}
