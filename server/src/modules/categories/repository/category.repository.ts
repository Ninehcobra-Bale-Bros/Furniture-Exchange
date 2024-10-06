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

  async getProductsBySlug(slug: string) {
    return this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.products', 'products') // Join with products
      .where('category.slug = :slug', { slug })
      .getOne();
  }
}
