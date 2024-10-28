import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { ServiceinvoiceService } from '../serviceinvoice.service';
import { InvoiceList } from '../invoice';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DeliveryService } from 'src/app/services/delivery.service';
import { IShipment } from 'src/app/models/delivery.model';
import { ToastService } from 'src/app/services/toast.service';
import { E } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
})
export class AppInvoiceListComponent implements AfterViewInit, OnInit {
  allComplete: boolean = false;

  invoiceList = new MatTableDataSource<IShipment>([]);
  displayedColumns: string[] = [
    'id',
    'other_id',
    'product_name',
    'total_after_delivery',
    'status',
    'action',
  ];

  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  @ViewChild(MatPaginator) paginator: MatPaginator = Object.create(null);

  constructor(
    private invoiceService: ServiceinvoiceService,
    private deliveryService: DeliveryService,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.getInvoiceList();
  }

  receiveInvoice(id: string) {
    this.deliveryService.updateShipperDelivery(id).subscribe(
      (res) => {
        this.deliveryService
          .updateShipmentStatus({
            id: id,
            status: 'delivering',
          })
          .subscribe((res) => {
            this.getInvoiceList();
            this.toastService.showSuccess('Nhận đơn hàng thành công');
          });
      },
      (e) => {
        this.toastService.showError('Nhận đơn hàng thất bại');
      }
    );
  }

  getInvoiceList() {
    this.deliveryService.getAllShipmentByStatus('pending').subscribe((res) => {
      this.invoiceList.data = res.data;
    });
  }

  ngAfterViewInit(): void {
    this.invoiceList.paginator = this.paginator;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  updateAllComplete(): void {
    // this.allComplete =
    //   this.invoiceList != null &&
    //   this.invoiceList.data.every((t) => t.completed);
  }
  someComplete(): any {
    // return (
    //   this.invoiceList.data.filter((t) => t.completed).length > 0 &&
    //   !this.allComplete
    // );
  }
  setAll(completed: boolean): void {
    // this.allComplete = completed;
    // this.invoiceList.data.forEach((t) => (t.completed = completed));
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  filter(filterValue: string): void {
    this.invoiceList.filter = filterValue.trim().toLowerCase();
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  deleteInvoice(row: number): void {
    if (confirm('Are you sure you want to delete this record ?')) {
      this.invoiceService.deleteInvoice(row);
      this.invoiceList.data = this.invoiceList.data.filter(
        (invoice) => invoice.id !== row
      );
    }
  }
}
