import { IsBoolean, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { RoleEnum } from 'src/common/enums/role.enum';
import { SexEnum } from 'src/common/enums/sex.enum';
import { Category } from '../entities/category.entity';
import { ApiProperty } from '@nestjs/swagger';
import { slugSerialize } from '../../../utils';

export class CategoryDto implements Readonly<CategoryDto> {
  id!: number;
  parent_id!: number | null;
  parent?: Category;
  name!: string;
  description!: string;
  image_url!: string;
  slug!: string;
  order: number;

  public static from(dto: Partial<CategoryDto>) {
    const it = new CategoryDto();

    it.id = dto.id;
    it.parent_id = dto.parent_id;
    it.parent = dto.parent;
    it.name = dto.name;
    it.slug = dto.slug;
    it.description = dto.description;
    it.image_url = dto.image_url;
    it.order = dto.order;

    return it;
  }

  public static fromEntity(entity: Category) {
    return this.from({
      id: entity.id,
      parent_id: entity.parent_id,
      parent: entity.parent,
      name: entity.name,
      slug: entity.slug,
      description: entity.description,
      image_url: entity.image_url,
      order: entity.order,
    });
  }

  public static toEntity(dto: Partial<Category>) {
    const it = new Category();

    it.parent_id = dto.parent_id || null;
    it.name = dto.name;
    it.image_url = dto.image_url;
    it.slug = slugSerialize(dto.name);
    it.description = dto.description;
    it.order = dto.order;

    return it;
  }
}
