export default class OnReturnedEvent {
  shipment_id: number;
  seller_id: string;
  product_id: string;
  quantity: string;

  constructor(
    shipment_id: number,
    seller_id: string,
    product_id: string,
    quantity: string,
  ) {
    this.shipment_id = shipment_id;
    this.seller_id = seller_id;
    this.product_id = product_id;
    this.quantity = quantity;
  }
}
