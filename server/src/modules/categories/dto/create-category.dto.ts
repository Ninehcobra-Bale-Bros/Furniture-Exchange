import { PartialType } from '@nestjs/mapped-types';
import { CategoryDto } from './category.dto';
import { Category } from '../entities/category.entity';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class CreateCategoryDto extends PartialType(CategoryDto) {
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Category name',
    example: 'Bàn',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Category description',
    example: 'Bàn là dụng cụ dùng để đặt đồ',
  })
  @IsString()
  description!: string;

  @Exclude()
  id: number & { __brand: 'categoryId' };

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Parent category id',
    example: '1',
  })
  @IsNumber()
  parent_id?: (number & { __brand: 'categoryId' }) | null;
}
