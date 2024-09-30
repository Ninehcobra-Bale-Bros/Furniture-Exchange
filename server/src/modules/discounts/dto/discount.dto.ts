import { Category } from 'src/modules/categories/entities/category.entity';
import { Discount } from '../entities/discount.entity';

export class DiscountDto implements Readonly<DiscountDto> {
  id: number;
  name: string;
  description: string;
  min_price: number;
  max_price: number;
  discount_percent: number;
  order: number;

  public static from(dto: Partial<DiscountDto>) {
    const it = new DiscountDto();

    it.id = dto.id;
    it.name = dto.name;
    it.description = dto.description;
    it.min_price = dto.min_price;
    it.max_price = dto.max_price;
    it.discount_percent = dto.discount_percent;
    it.order = dto.order;

    return it;
  }

  public static fromEntity(entity: Discount) {
    return this.from({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      min_price: entity.min_price,
      max_price: entity.max_price,
      discount_percent: entity.discount_percent,
      order: entity.order,
    });
  }

  public static toEntity(dto: Partial<Discount>) {
    const it = new Discount();

    it.name = dto.name;
    it.description = dto.description;
    it.min_price = dto.min_price;
    it.max_price = dto.max_price;
    it.discount_percent = dto.discount_percent;
    it.order = dto.order;

    return it;
  }
}
