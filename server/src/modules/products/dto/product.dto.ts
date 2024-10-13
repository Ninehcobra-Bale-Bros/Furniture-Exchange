import { plainToClass, Transform } from 'class-transformer';
import { UUID } from 'crypto';
import { StateEnum, StatusEnum } from 'src/common/enums/product.enum';
import { Product } from 'src/modules/products/entities/product.entity';
import { slugSerialize } from 'src/utils';

export class ProductDto implements Readonly<ProductDto> {
  id!: number & { __brand: 'productId' };
  seller_id!: UUID & { __brand: 'userId' };
  category_id!: number & { __brand: 'categoryId' };
  name!: string;
  slug: string;
  quantity!: number;
  kilogram: number;
  description!: string;

  @Transform(
    ({ value }) => {
      return value.match(/"([^"]+)"/g).map((s) => s.replace(/"/g, ''));
    },
    { toClassOnly: true },
  )
  image_urls!: string[];

  @Transform(
    ({ value }) => {
      return value.match(/"([^"]+)"/g).map((s) => s.replace(/"/g, ''));
    },
    { toClassOnly: true },
  )
  image_ids!: string[];

  @Transform(({ value }) => Number(value))
  price!: number;
  origin!: string;
  address_line!: string;
  district!: string;
  province!: string;
  status!: StatusEnum;
  state!: StateEnum;
  expired_at!: Date;
  created_at!: Date;
  updated_at!: Date;

  public static from(dto: Partial<ProductDto>) {
    const it = new ProductDto();

    it.id = dto.id;
    it.seller_id = dto.seller_id;
    it.category_id = dto.category_id;
    it.name = dto.name;
    it.slug = dto.slug;
    it.quantity = dto.quantity;
    it.kilogram = dto.kilogram;
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
    it.expired_at = dto.expired_at;
    it.created_at = dto.created_at;
    it.updated_at = dto.updated_at;

    return plainToClass(ProductDto, it);
  }

  public static fromEntity(entity: Product) {
    return this.from({
      id: entity.id,
      seller_id: entity.seller_id,
      category_id: entity.category_id,
      name: entity.name,
      slug: entity.slug,
      quantity: entity.quantity,
      kilogram: entity.kilogram,
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
      expired_at: entity.expired_at,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
  }

  public static toEntity(dto: Partial<ProductDto>) {
    const it = new Product();

    it.seller_id = dto.seller_id;
    it.category_id = dto.category_id;
    it.name = dto.name;
    it.slug = slugSerialize(dto.name);
    it.quantity = dto.quantity;
    it.kilogram = dto.kilogram;
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
    it.expired_at = dto.expired_at;
    it.created_at = dto.created_at;
    it.updated_at = dto.updated_at;

    return it;
  }
}
