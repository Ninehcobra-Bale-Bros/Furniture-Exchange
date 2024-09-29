import { UUID } from 'crypto';
import { StateEnum, StatusEnum } from 'src/common/enums/product.enum';
import { Product } from 'src/modules/products/entities/product.entity';

export class ProductDto implements Readonly<ProductDto> {
  id!: number & { __brand: 'productId' };
  seller_id!: UUID & { __brand: 'userId' };
  category_id!: number & { __brand: 'categoryId' };
  name!: string;
  description!: string;
  image_urls!: string[];
  image_ids!: string[];
  price!: number;
  origin!: string;
  address_line!: string;
  district!: string;
  province!: string;
  status!: StatusEnum;
  state!: StateEnum;

  public static from(dto: Partial<ProductDto>) {
    const it = new ProductDto();

    it.id = dto.id;
    it.seller_id = dto.seller_id;
    it.category_id = dto.category_id;
    it.name = dto.name;
    it.description = dto.description;
    it.image_urls = dto.image_urls;
    it.image_ids = dto.image_ids;
    it.price = dto.price;
    it.origin = dto.origin;
    it.address_line = dto.address_line;
    it.district = dto.district;
    it.province = dto.province;
    it.status = dto.status;
    it.state = dto.state;

    return it;
  }

  public static fromEntity(entity: Product) {
    return this.from({
      id: entity.id,
      seller_id: entity.seller_id,
      category_id: entity.category_id,
      name: entity.name,
      description: entity.description,
      image_urls: entity.image_urls,
      image_ids: entity.image_ids,
      price: entity.price,
      origin: entity.origin,
      address_line: entity.address_line,
      district: entity.district,
      province: entity.province,
      status: entity.status,
      state: entity.state,
    });
  }

  public static toEntity(dto: Partial<ProductDto>) {
    const it = new Product();

    it.seller_id = dto.seller_id;
    it.category_id = dto.category_id;
    it.name = dto.name;
    it.description = dto.description;
    it.image_urls = dto.image_urls;
    it.image_ids = dto.image_ids;
    it.price = dto.price;
    it.origin = dto.origin;
    it.address_line = dto.address_line;
    it.district = dto.district;
    it.province = dto.province;
    it.status = dto.status;
    it.state = dto.state;

    return it;
  }
}
