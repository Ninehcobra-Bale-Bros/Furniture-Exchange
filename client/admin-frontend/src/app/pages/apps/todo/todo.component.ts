import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { TodoService } from './todo.service';
import { DeliveryService } from 'src/app/services/delivery.service';
import { IShipment } from 'src/app/models/delivery.model';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class AppTodoComponent implements OnInit {
  sidePanelOpened = true;
  public showSidebar = false;
  inputFg: UntypedFormGroup = Object.create(null);
  shipments: IShipment[] = [];
  filteredShipments: IShipment[] = [];
  selectedCategory = 'all';
  searchText: string | null = null;

  all: number = 0;
  pending: number = 0;
  delivering: number = 0;
  delivered: number = 0;
  returned: number = 0;

  constructor(
    public fb: UntypedFormBuilder,
    private deliveryService: DeliveryService,
    private datePipe: DatePipe,
    private toastService: ToastService
  ) {}

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  ngOnInit(): void {
    this.inputFg = this.fb.group({
      mess: [],
    });
    this.getShipments();
  }

  formatDateToVietnamese(date: string | Date): string {
    return this.datePipe.transform(date, 'fullDate', '', 'vi') || '';
  }

  getStatusTranslation(status: string): string {
    switch (status) {
      case 'delivering':
        return 'Đang giao';
      case 'delivered':
        return 'Đã giao';
      case 'returned':
        return 'Đã trả lại';
      default:
        return status;
    }
  }

  getShipments(): void {
    this.deliveryService.getAllShipperShipment().subscribe((shipments) => {
      this.shipments = shipments;
      this.filteredShipments = shipments;
      this.all = shipments.length;
      this.pending = shipments.filter(
        (shipment) => shipment.status === 'pending'
      ).length;
      this.delivering = shipments.filter(
        (shipment) => shipment.status === 'delivering'
      ).length;
      this.delivered = shipments.filter(
        (shipment) => shipment.status === 'delivered'
      ).length;
      this.returned = shipments.filter(
        (shipment) => shipment.status === 'returned'
      ).length;
    });
  }

  confirmDelivery(shipment: IShipment): void {
    // Implement the logic to confirm delivery
    // For example, you might update the shipment status to 'delivered'
    this.deliveryService
      .updateShipmentStatus({ id: shipment.id.toString(), status: 'delivered' })
      .subscribe(
        () => {
          // Update the local shipment status
          shipment.status = 'delivered';
          this.toastService.showSuccess('Giao hàng thành công');
          this.getShipments();
        },
        (error) => {
          console.error('Error confirming delivery:', error);
        }
      );
  }

  selectionlblClick(val: string): void {
    if (val === 'all') {
      this.filteredShipments = this.shipments;
      this.selectedCategory = 'all';
    } else {
      this.filteredShipments = this.shipments.filter(
        (shipment) => shipment.status === val
      );
      this.selectedCategory = val;
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'delivering':
        return 'bg-warning';
      case 'delivered':
        return 'bg-success';
      case 'returned':
        return 'bg-error';
      default:
        return '';
    }
  }
}
