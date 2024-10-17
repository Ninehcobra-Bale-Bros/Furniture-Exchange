import { UUID } from 'crypto';
import { DeliveryStatusEnum } from 'src/common/enums/delivery.enum';
import { Delivery } from '../entities/delivery.entity';
import { Exclude, plainToClass, Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class DeliveryDto implements Readonly<DeliveryDto> {
  id: number & { __brand: 'deliveryId' };

  @Exclude({
    toClassOnly: true,
  })
  _id: number;

  user_id: UUID & { __brand: 'userId' };
  other_id: UUID & { __brand: 'userId' };
  deliver_id: UUID & { __brand: 'userId' };
  product_id: number;
  other_fullname: string;
  other_phone: string;
  pickup_address: string;
  delivery_address: string;

  @Transform(({ value }) => {
    return Number(value);
  })
  amount: number;

  @Transform(({ value }) => {
    return Number(value);
  })
  quantity: number;

  @Transform(({ value }) => {
    return Number(value);
  })
  total: number;

  @Transform(({ value }) => {
    return Number(value);
  })
  shipping_fee: number;

  status: DeliveryStatusEnum;
  other_confirmed: boolean;
  created_at: Date;
  updated_at: Date;
  expired_at: Date;

  public static from(dto: Partial<DeliveryDto>) {
    const it = new DeliveryDto();

    it.id = dto.id;
    it._id = dto._id;
    it.user_id = dto.user_id;
    it.other_id = dto.other_id;
    it.deliver_id = dto.deliver_id;
    it.product_id = dto.product_id;
    it.other_fullname = dto.other_fullname;
    it.other_phone = dto.other_phone;
    it.pickup_address = dto.pickup_address;
    it.delivery_address = dto.delivery_address;
    it.amount = dto.amount;
    it.quantity = dto.quantity;
    it.shipping_fee = dto.shipping_fee;
    it.total = dto.total;
    it.status = dto.status;
    it.other_confirmed = dto.other_confirmed;
    it.created_at = dto.created_at;
    it.updated_at = dto.updated_at;
    it.expired_at = dto.expired_at;

    return plainToClass(DeliveryDto, it);
  }

  public static fromEntity(entity: Delivery) {
    return this.from({
      id: entity.id,
      _id: entity.id as number,
      user_id: entity.user_id,
      other_id: entity.other_id,
      deliver_id: entity.deliver_id,
      product_id: entity.product_id,
      other_fullname: entity.other_fullname,
      other_phone: entity.other_phone,
      pickup_address: entity.pickup_address,
      delivery_address: entity.delivery_address,
      amount: entity.amount,
      quantity: entity.quantity,
      shipping_fee: entity.shipping_fee,
      total: entity.total,
      status: entity.status,
      other_confirmed: entity.other_confirmed,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
      expired_at: entity.expired_at,
    });
  }

  public static toEntity(dto: Partial<Delivery>) {
    const it = new Delivery();

    it.user_id = dto.user_id;
    it.other_id = dto.other_id;
    it.product_id = dto.product_id;
    it.other_fullname = dto.other_fullname;
    it.other_phone = dto.other_phone;
    it.pickup_address = dto.pickup_address;
    it.delivery_address = dto.delivery_address;
    it.amount = dto.amount;
    it.quantity = dto.quantity;
    it.shipping_fee = dto.shipping_fee;
    it.total = dto.total;

    return it;
  }
}
