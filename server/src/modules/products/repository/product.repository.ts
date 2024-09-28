import { GenericRepository } from 'src/core/generic.repository';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class ProductRepository extends GenericRepository<Product> {
  constructor(@InjectRepository(Product) private readonly productRepository) {
    super(productRepository);
  }
}
