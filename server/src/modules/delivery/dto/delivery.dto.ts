import { UUID } from 'crypto';
import { DeliveryStatus } from 'src/common/enums/delivery.enum';
import { Delivery } from '../entities/delivery.entity';

export class DeliveryDto implements Readonly<DeliveryDto> {
  id: number & { __brand: 'deliveryId' };
  _id: number;
  user_id: UUID & { __brand: 'userId' };
  other_id: UUID & { __brand: 'userId' };
  delivery_id: UUID & { __brand: 'userId' };
  product_id: number;
  pickup_address: string;
  delivery_address: string;
  amount: number;
  status: DeliveryStatus;
  created_at: Date;
  updated_at: Date;

  public static from(dto: Partial<DeliveryDto>) {
    const it = new DeliveryDto();

    it.id = dto.id;
    it._id = dto._id;
    it.user_id = dto.user_id;
    it.other_id = dto.other_id;
    it.delivery_id = dto.delivery_id;
    it.product_id = dto.product_id;
    it.pickup_address = dto.pickup_address;
    it.delivery_address = dto.delivery_address;
    it.amount = dto.amount;
    it.status = dto.status;
    it.created_at = dto.created_at;
    it.updated_at = dto.updated_at;
    return it;
  }

  public static fromEntity(entity: Delivery) {
    return this.from({
      id: entity.id,
      _id: entity.id as number,
      user_id: entity.user_id,
      other_id: entity.other_id,
      delivery_id: entity.delivery_id,
      product_id: entity.product_id,
      pickup_address: entity.pickup_address,
      delivery_address: entity.delivery_address,
      amount: entity.amount,
      status: entity.status,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
  }

  public toEntity(this: DeliveryDto) {
    const it = new Delivery();

    it.id = this.id;
    it.user_id = this.user_id;
    it.other_id = this.other_id;
    it.delivery_id = this.delivery_id;
    it.product_id = this.product_id;
    it.pickup_address = this.pickup_address;
    it.delivery_address = this.delivery_address;
    it.amount = this.amount;
    it.status = this.status;
    it.created_at = this.created_at;
    it.updated_at = this.updated_at;

    return it;
  }
}
