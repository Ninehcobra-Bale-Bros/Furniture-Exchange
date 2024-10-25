import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { NgFor } from '@angular/common';
import { ITotalRevenue } from '../../../models/revenue.model';
import { IAdminDashboard } from 'src/app/models/admin.model.';

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

  topcards: TopCard[] = [
    {
      id: 1,
      color: 'primary',
      img: '/assets/images/svgs/icon-user-male.svg',
      title: 'Doanh thu',
      subtitle: '0',
    },
    {
      id: 2,
      color: 'warning',
      img: '/assets/images/svgs/icon-briefcase.svg',
      title: 'Tổng đơn',
      subtitle: '0',
    },
    {
      id: 3,
      color: 'accent',
      img: '/assets/images/svgs/icon-mailbox.svg',
      title: 'Tổng đơn',
      subtitle: '0',
    },
    {
      id: 4,
      color: 'error',
      img: '/assets/images/svgs/icon-favorites.svg',
      title: 'Deliveries',
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
      this.topcards[0].subtitle = this.formatRevenue(
        this.revenueData.total_revenue
      );
      this.topcards[1].subtitle = this.revenueData.total_sales.toString();

      this.topcards[2].subtitle =
        this.revenueData.delivery_num?.toString() || '0';
    }
    if (changes['adminDashboard'] && this.adminDashboard) {
      this.topcards[3].subtitle =
       
    }
  }
}
