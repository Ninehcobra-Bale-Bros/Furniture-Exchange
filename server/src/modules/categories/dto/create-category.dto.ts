import { PartialType } from '@nestjs/mapped-types';
import { CategoryDto } from './category.dto';
import { Category } from '../entities/category.entity';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';

export class CreateCategoryDto extends PartialType(CategoryDto) {
  @Exclude()
  id: number & { __brand: 'categoryId' };

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

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Parent category id',
    example: '1',
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  parent_id?: (number & { __brand: 'categoryId' }) | null;

  @ApiProperty({
    required: false,
    type: 'number',
    description: 'Category order',
    example: 0,
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  order?: number;
}
