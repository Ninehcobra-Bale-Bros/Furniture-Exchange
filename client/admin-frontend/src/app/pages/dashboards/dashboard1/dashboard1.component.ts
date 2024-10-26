import { Component, OnInit } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';

// components
import { AppTopCardsComponent } from '../../../components/dashboard1/top-cards/top-cards.component';
import { AppRevenueUpdatesComponent } from '../../../components/dashboard1/revenue-updates/revenue-updates.component';
import { AppYearlyBreakupComponent } from '../../../components/dashboard1/yearly-breakup/yearly-breakup.component';
import { AppMonthlyEarningsComponent } from '../../../components/dashboard1/monthly-earnings/monthly-earnings.component';
import { AppEmployeeSalaryComponent } from '../../../components/dashboard1/employee-salary/employee-salary.component';
import { AppCustomersComponent } from '../../../components/dashboard1/customers/customers.component';
import { AppProductsComponent } from '../../../components/dashboard2/products/products.component';
import { AppSocialCardComponent } from '../../../components/dashboard1/social-card/social-card.component';
import { AppSellingProductComponent } from '../../../components/dashboard1/selling-product/selling-product.component';
import { AppWeeklyStatsComponent } from '../../../components/dashboard1/weekly-stats/weekly-stats.component';
import { AppTopProjectsComponent } from '../../../components/dashboard1/top-projects/top-projects.component';
import { AppProjectsComponent } from '../../../components/dashboard1/projects/projects.component';
import { RevenueService } from 'src/app/services/revenue.service';
import { IChartRevenue, ITotalRevenue } from 'src/app/models/revenue.model';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { IAdminDashboard } from 'src/app/models/admin.model.';
import { AdminService } from 'src/app/services/admin.service';
import { CommonModule } from '@angular/common';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexMarkers,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { AppGredientChartComponent } from '../../charts/gredient/gredient.component';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-dashboard1',
  standalone: true,
  imports: [
    CommonModule,
    TablerIconsModule,
    AppTopCardsComponent,
    AppRevenueUpdatesComponent,
    AppYearlyBreakupComponent,
    AppMonthlyEarningsComponent,
    AppEmployeeSalaryComponent,
    AppCustomersComponent,
    AppProductsComponent,
    AppSocialCardComponent,
    AppSellingProductComponent,
    AppWeeklyStatsComponent,
    AppTopProjectsComponent,
    AppProjectsComponent,
    AppGredientChartComponent,
    NgApexchartsModule,
    MaterialModule,
  ],
  templateUrl: './dashboard1.component.html',
})
export class AppDashboard1Component implements OnInit {
  user: Observable<IUser | null>;

  public chartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
    dataLabels: ApexDataLabels;
    stroke: ApexStroke;
    grid: ApexGrid;
    fill: ApexFill;
  };

  totalRevenue: ITotalRevenue;
  chartRevenue: IChartRevenue[];
  monthlyCosts: number[] = [];

  adminDashboardData: IAdminDashboard | null = null;

  topCardsData: any;
  revenueUpdatesData: any;
  yearlyBreakupData: any;
  monthlyEarningsData: any;
  employeeSalaryData: any;
  customersData: any;
  projectsData: any;
  socialCardData: any;
  sellingProductData: any;
  weeklyStatsData: any;
  topProjectsData: any;

  constructor(
    private revenueService: RevenueService,
    private userService: UserService,
    private adminService: AdminService
  ) {
    this.user = this.userService.user$;
    this.chartOptions = {
      series: [
        {
          name: 'Tổng doanh thu',
          data: [],
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        dropShadow: {
          enabled: true,
          color: 'rgba(0,0,0,0.2)',
          top: 12,
          left: 4,
          blur: 3,
          opacity: 0.4,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 7,
        curve: 'smooth',
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#5D87FF'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 0.9,
          stops: [0, 100, 100, 100],
        },
      },
      title: {
        text: 'Doanh thu theo tháng',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [],
        labels: {
          formatter: function (value: string) {
            return 'Tháng ' + value;
          },
        }, // Initialize with empty categories
      },
      yaxis: {
        labels: {
          formatter: function (value: number) {
            return value.toLocaleString() + ' VNĐ';
          },
        },
      },
    };
  }

  ngOnInit(): void {
    this.user.subscribe((user) => {
      if (user) {
        if (user.role === 'seller') {
          this.fetchSellerRevenueData();
        } else if (user.role === 'admin') {
          this.fetchAdminRevenueData();
        }
      }
    });
  }
  gredientChartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    fill: ApexFill;
    markers: ApexMarkers;
    yaxis: ApexYAxis;
    plotOptions: ApexPlotOptions;
    tooltip: ApexTooltip;
    grid: ApexGrid;
  };

  fetchSellerRevenueData() {
    this.revenueService.getSellerReevenue().subscribe((data: ITotalRevenue) => {
      this.totalRevenue = data;
      this.updateTopCards();
    });
    this.revenueService
      .getSellerChartRevenue()
      .subscribe((data: IChartRevenue[]) => {
        this.chartRevenue = data;
        const categories = data.map((item) => `Tháng ${item.month}`);
        const seriesData = data.map((item) => item.totalRevenue);

        this.chartOptions.series = [
          {
            name: 'Tổng doanh thu',
            data: seriesData,
          },
        ];
        this.chartOptions.xaxis.categories = categories;

        this.monthlyCosts = data.map((item) => item.totalRevenue * 0.15);
      });
  }

  fetchAdminRevenueData() {
    this.revenueService.getAdminRevenue().subscribe((data: ITotalRevenue) => {
      this.totalRevenue = data;
      this.updateTopCards();
    });
    this.revenueService
      .getAdminChartRevenue()
      .subscribe((data: IChartRevenue[]) => {
        this.chartRevenue = data;
        const categories = data.map((item) => `Tháng ${item.month}`);
        const seriesData = data.map((item) => item.totalRevenue);

        this.chartOptions.series = [
          {
            name: 'Tổng doanh thu',
            data: seriesData,
          },
        ];
        this.chartOptions.xaxis.categories = categories;

        this.monthlyCosts = data.map((item) => item.totalRevenue * 0.15);
      });
    this.adminService.getAdminDashboard().subscribe((data: IAdminDashboard) => {
      this.adminDashboardData = data;
      this.updateTopCards();
    });
  }

  updateTopCards() {
    this.topCardsData = {
      totalRevenue: this.totalRevenue.total_revenue,
      totalSales: this.totalRevenue.total_sales,
      averageOrderValue:
        this.totalRevenue.total_revenue / this.totalRevenue.total_sales,
      conversionRate: 3.5, // Fake data
    };
  }
}
