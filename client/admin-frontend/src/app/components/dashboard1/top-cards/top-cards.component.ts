import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { NgFor } from '@angular/common';
import { ITotalRevenue } from '../../../models/revenue.model';
import { IAdminDashboard } from 'src/app/models/admin.model.';
import { IUser } from 'src/app/models/user.model';

interface TopCard {
  id: number;
  img: string;
  color: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-top-cards',
  standalone: true,
  imports: [MaterialModule, NgFor],
  templateUrl: './top-cards.component.html',
})
export class AppTopCardsComponent implements OnChanges {
  @Input() revenueData: ITotalRevenue;
  @Input() adminDashboard: IAdminDashboard | null;
  @Input() user: IUser | null;
  topcards: TopCard[] = [
    {
      id: 1,
      color: 'primary',
      img: '/assets/images/svgs/icon-user-male.svg',
      title: 'Người dùng',
      subtitle: '0',
    },
    {
      id: 2,
      color: 'warning',
      img: '/assets/images/svgs/icon-briefcase.svg',
      title: 'Người bán',
      subtitle: '0',
    },
    {
      id: 3,
      color: 'accent',
      img: '/assets/images/svgs/icon-mailbox.svg',
      title: 'Sản phẩm',
      subtitle: '0',
    },
    {
      id: 4,
      color: 'error',
      img: '/assets/images/svgs/icon-favorites.svg',
      title: 'Đơn hàng',
      subtitle: '0',
    },
    {
      id: 5,
      color: 'success',
      img: '/assets/images/svgs/icon-speech-bubble.svg',
      title: 'Doanh thu',
      subtitle: '0',
    },
    {
      id: 6,
      color: 'accent',
      img: '/assets/images/svgs/icon-connect.svg',
      title: 'Lượng truy cập',
      subtitle: '0',
    },
  ];

  formatRevenue(value: number): string {
    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(2) + ' tỷ';
    } else if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(2) + ' triệu';
    }
    return value.toString();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['revenueData'] && this.revenueData) {
      this.topcards[3].subtitle = this.revenueData.total_sales.toString();
      this.topcards[4].subtitle = this.formatRevenue(
        this.revenueData.total_revenue
      );
    }
    if (changes['adminDashboard'] && this.adminDashboard) {
      this.topcards[0].subtitle = this.adminDashboard.users_num.toString();
      this.topcards[1].subtitle = this.adminDashboard.sellers_num.toString();
      this.topcards[2].subtitle = this.adminDashboard.products_num.toString();

      this.topcards[5].subtitle = this.adminDashboard.accesses_num.toString();
    }
    if (changes['user'] && this.user) {
      console.log('User data received:', this.user);
    }
  }

  getFilteredCards(): TopCard[] {
    if (this.user?.role === 'admin') {
      return this.topcards;
    } else if (this.user?.role === 'seller') {
      return [this.topcards[3], this.topcards[4]];
    }
    return [];
  }

  trackById(index: number, item: TopCard): number {
    return item.id;
  }
}
