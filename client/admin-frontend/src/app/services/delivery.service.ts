import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import {
  ICreateShipmenPayload,
  ICreateShipmentResponse,
  IGetShipperAllShipmentResponse,
  IGetUserAllShipmentResponse,
  IUpdateShipmentStatusPayload,
} from '../models/delivery.model';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService extends BaseService {
  url = 'delivery';

  createShipment(payload: ICreateShipmenPayload) {
    return this.post<ICreateShipmentResponse>(this.url, payload);
  }

  getAllShipmentByStatus(
    status: 'pending' | 'delivering' | 'delivered' | 'returned'
  ) {
    return this.get<IGetUserAllShipmentResponse>(
      `${this.url}/?status=${status}&offset=1&limit=100`
    );
  }

  getAllUserShipment() {
    return this.get<IGetUserAllShipmentResponse>(`${this.url}/user`);
  }

  getAllShipperShipment() {
    return this.get<IGetShipperAllShipmentResponse>(`${this.url}/shipper`);
  }

  confirmUserShipment(id: string) {
    return this.patch(`${this.url}/user/confirm/${id}`, {});
  }

  updateShipmentStatus(payload: IUpdateShipmentStatusPayload) {
    return this.patch(
      `${this.url}/status/${payload.id}?status=${payload.status}`,
      {}
    );
  }

  updateShipperDelivery(id: string) {
    return this.patch(`${this.url}/deliver/${id}`, {});
  }

  cancelShipment(id: string) {
    return this.patch(`${this.url}/user/cancel/${id}`, {
      id: id,
    });
  }
}
