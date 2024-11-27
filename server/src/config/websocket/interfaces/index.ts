import { UUID } from 'crypto';

export enum MessageType {
  NEW_MESSAGE = 'newMessage',
  SHIPMENT_ALERT = 'shipmentAlert',
}
export interface Message {
  type: MessageType;
  product_id: string;
  other_id: UUID & { __brand: 'userId' };
  content: string;
}
