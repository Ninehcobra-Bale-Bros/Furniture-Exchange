import { IsBoolean, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { RoleEnum } from 'src/common/enums/role.enum';
import { SexEnum } from 'src/common/enums/sex.enum';
import { Category } from '../entities/category.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto implements Readonly<CategoryDto> {
  id!: number;
  parent_id!: number | null;
  parent?: Category;
  name!: string;
  description!: string;
  image_url!: string;
  image_id!: string;
  order: number;

  public static from(dto: Partial<CategoryDto>) {
    const category = new CategoryDto();

    category.id = dto.id;
    category.parent_id = dto.parent_id;
    category.parent = dto.parent;
    category.name = dto.name;
    category.description = dto.description;
    category.image_url = dto.image_url;
    category.image_id = dto.image_id;
    category.order = dto.order;

    return category;
  }

  public static fromEntity(entity: Category) {
    return this.from({
      id: entity.id,
      parent_id: entity.parent_id,
      parent: entity.parent,
      name: entity.name,
      description: entity.description,
      image_url: entity.image_url,
      image_id: entity.image_id,
      order: entity.order,
    });
  }

  public static toEntity(dto: Partial<Category>) {
    const category = new Category();

    category.parent_id = dto.parent_id || null;
    category.name = dto.name;
    category.description = dto.description;
    category.order = dto.order;

    return category;
  }
}
