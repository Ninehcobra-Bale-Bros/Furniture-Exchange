import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { ServiceinvoiceService } from '../serviceinvoice.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DeliveryService } from 'src/app/services/delivery.service';
import { IShipment } from 'src/app/models/delivery.model';
import { ToastService } from 'src/app/services/toast.service';
import { IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
})
export class AppInvoiceListComponent implements AfterViewInit, OnInit {
  allComplete: boolean = false;
  user: Observable<IUser | null>;
  private userSubscription: Subscription = Subscription.EMPTY;

  invoiceList = new MatTableDataSource<IShipment>([]);
  displayedColumns: string[] = [
    'id',
    'other_id',
    'product_name',
    'total_after_delivery',
    'status',
    'action', // Default columns
  ];

  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  @ViewChild(MatPaginator) paginator: MatPaginator = Object.create(null);

  selectedStatus: string = 'pending';
  statusOptions: { value: string; viewValue: string }[] = [
    { value: 'pending', viewValue: 'Đang chờ xử lý' },
    { value: 'delivering', viewValue: 'Đang giao hàng' },
    { value: 'delivered', viewValue: 'Đã giao hàng' },
    { value: 'returned', viewValue: 'Đã trả lại' },
  ];

  constructor(
    private invoiceService: ServiceinvoiceService,
    private deliveryService: DeliveryService,
    private toastService: ToastService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.user$.subscribe((user) => {
      if (user && user.role) {
        this.user = this.userService.user$;
        // Update displayed columns based on user role
        if (user.role === 'admin') {
          this.displayedColumns = this.displayedColumns.filter(
            (col) => col !== 'action'
          );
        }
      }
    });

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
    this.deliveryService
      .getAllShipmentByStatus(
        this.selectedStatus as
          | 'delivering'
          | 'delivered'
          | 'returned'
          | 'pending'
      )
      .subscribe((res) => {
        this.invoiceList.data = res.data;
      });
  }

  ngAfterViewInit(): void {
    this.invoiceList.paginator = this.paginator;
  }

  filter(filterValue: string): void {
    this.invoiceList.filter = filterValue.trim().toLowerCase();
  }

  deleteInvoice(row: number): void {
    if (confirm('Are you sure you want to delete this record ?')) {
      this.invoiceService.deleteInvoice(row);
      this.invoiceList.data = this.invoiceList.data.filter(
        (invoice) => invoice.id !== row
      );
    }
  }
}
