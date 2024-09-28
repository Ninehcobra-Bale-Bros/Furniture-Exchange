import { IsBoolean, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { RoleEnum } from 'src/common/enums/role.enum';
import { SexEnum } from 'src/common/enums/sex.enum';
import { Category } from '../entities/category.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto implements Readonly<CategoryDto> {
  id!: number;

  parent_id!: number | null;

  name!: string;

  description!: string;

  created_at!: Date;

  updated_at!: Date;

  public static from(dto: Partial<CategoryDto>) {
    const category = new CategoryDto();

    category.id = dto.id;
    category.parent_id = dto.parent_id;
    category.name = dto.name;
    category.description = dto.description;
    category.created_at = dto.created_at;
    category.updated_at = dto.updated_at;

    return category;
  }

  public static fromEntity(entity: Category) {
    return this.from({
      id: entity.id,
      parent_id: entity.parent_id,
      name: entity.name,
      description: entity.description,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
  }

  public static toEntity(dto: Partial<Category>) {
    const category = new Category();

    category.parent_id = dto.parent_id || null;
    category.name = dto.name;
    category.description = dto.description;

    console.log(category);

    return category;
  }
}