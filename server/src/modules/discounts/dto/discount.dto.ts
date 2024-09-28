import { Category } from 'src/modules/categories/entities/category.entity';
import { Discount } from '../entities/discount.entity';

export class DiscountDto implements Readonly<DiscountDto> {
  id: number;
  name: string;
  description: string;
  min_price: number;
  discount_percent: number;

  public static from(dto: Partial<DiscountDto>) {
    const discount = new DiscountDto();

    discount.id = dto.id;
    discount.name = dto.name;
    discount.description = dto.description;
    discount.min_price = dto.min_price;
    discount.discount_percent = dto.discount_percent;

    return discount;
  }

  public static fromEntity(entity: Discount) {
    return this.from({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      min_price: entity.min_price,
      discount_percent: entity.discount_percent,
    });
  }

  public static toEntity(dto: Partial<Discount>) {
    const discount = new Discount();

    discount.name = dto.name;
    discount.description = dto.description;
    discount.min_price = dto.min_price;
    discount.discount_percent = dto.discount_percent;

    return discount;
  }
}
