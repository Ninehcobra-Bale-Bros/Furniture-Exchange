import { FindManyOptions, FindOneOptions } from 'typeorm';

export interface IGenericRepository<T> {
  findAll(options: FindManyOptions<T>): Promise<T[]>;

  findOneBy(options: FindOneOptions<T>): Promise<T>;
}
