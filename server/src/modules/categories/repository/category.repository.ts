import { GenericRepository } from 'src/core/generic.repository';
import { Category } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class CategoryRepository extends GenericRepository<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository);
  }
}
