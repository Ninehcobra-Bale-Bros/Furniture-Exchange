import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryDto } from './dto/category.dto';
import * as fs from 'fs';
import * as path from 'path';
import { CategoryRepository } from './repository/category.repository';
import { plainToClass } from 'class-transformer';
import { ProductDto } from 'src/modules/products/dto/product.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(dto: CreateCategoryDto) {
    if (dto.parent_id) {
      const parentCategory = await this.categoryRepository.findOneBy({
        where: { id: dto.parent_id },
      });

      if (!parentCategory) {
        throw new BadRequestException('Parent category not found');
      }
    }

    const newCategory = await this.categoryRepository.save(
      CategoryDto.toEntity(dto),
    );

    return CategoryDto.fromEntity(newCategory);
  }

  async findAll() {
    const categories = await this.categoryRepository.findAll({
      relations: ['parent'],
    });

    return categories.map((category) => CategoryDto.fromEntity(category));
  }

  async getProductsByCategory(slug: string) {
    const category = await this.categoryRepository
      .getProductsBySlug(slug)
      .then((category) => {
        category.products = category.products.map((product) => {
          return plainToClass(ProductDto, product) as any;
        });

        return category;
      });

    return category;
  }

  async writeToFile() {
    const categories = await this.categoryRepository.findAll();

    const filePath = path.resolve('db/seeds/categories/categories.json');

    fs.writeFile(filePath, JSON.stringify(categories), (err) => {
      if (err) {
        throw new InternalServerErrorException(
          `Error writing to file: ${err.message}`,
        );
      }
    });

    return 'Write to file successfully';
  }
}
