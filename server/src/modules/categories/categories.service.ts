import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(dto: CreateCategoryDto) {
    if (dto.parent_id) {
      const parentCategory = await this.categoryRepository.findOne({
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
    const categories = await this.categoryRepository.find({
      relations: ['parent_id'],
    });

    return categories.map((category) => CategoryDto.fromEntity(category));
  }

  async writeToFile() {
    const categories = await this.categoryRepository.find({
      relations: ['parent_id'],
    });

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
