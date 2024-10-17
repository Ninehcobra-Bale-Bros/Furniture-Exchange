import { UUID } from 'crypto';

export default class OnDeliveredEvent {
  delivery_id: number & { __brand: 'deliveryId' };
  seller_id: (UUID & { __brand: 'userId' }) | (string & { __brand: 'userId' });
  buyer_id: (UUID & { __brand: 'userId' }) | (string & { __brand: 'userId' });
  product_id: number & { __brand: 'productId' };
  quantity: number;

  constructor(
    delivery_id: number & { __brand: 'deliveryId' },
    seller_id:
      | (string & { __brand: 'userId' })
      | (UUID & { __brand: 'userId' }),
    buyer_id: (string & { __brand: 'userId' }) | (UUID & { __brand: 'userId' }),
    product_id: number & { __brand: 'productId' },
    quantity: number,
  ) {
    this.delivery_id = delivery_id;
    this.seller_id = seller_id;
    this.buyer_id = buyer_id;
    this.product_id = product_id;
    this.quantity = quantity;
  }
}
