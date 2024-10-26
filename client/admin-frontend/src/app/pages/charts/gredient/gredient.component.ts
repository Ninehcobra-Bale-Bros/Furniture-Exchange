import {
  Component,
  ViewChild,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexPlotOptions,
  ApexTheme,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { MaterialModule } from 'src/app/material.module';
import { IChartRevenue } from 'src/app/models/revenue.model';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: any;
  theme: ApexTheme;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  colors: string[];
  markers: any;
  grid: ApexGrid;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  labels: string[];
};

@Component({
  selector: 'app-gredient',
  standalone: true,
  imports: [NgApexchartsModule, MaterialModule],
  templateUrl: './gredient.component.html',
})
export class AppGredientChartComponent implements OnInit, OnChanges {
  @Input() chartRevenue: IChartRevenue[];

  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public gredientChartOptions: Partial<ChartOptions> | any = {
    series: [],
    chart: {},
    xaxis: {},
    stroke: {},
    fill: {},
    markers: {},
    yaxis: {},
    tooltip: {},
    grid: {},
  };

  ngOnInit() {
    this.initializeChartOptions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartRevenue'] && changes['chartRevenue'].currentValue) {
      this.initializeChartOptions();
    }
  }

  private initializeChartOptions() {
    if (!this.chartRevenue) {
      return;
    }

    this.gredientChartOptions = {
      series: [
        {
          name: 'Total Revenue',
          data: this.chartRevenue.map((item) => item.totalRevenue),
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
      stroke: {
        width: 7,
        curve: 'smooth',
      },

      xaxis: {
        type: 'datetime',
        categories: [
          '01/2024',
          '01/2024',
          '01/2024',
          '01/2024',
          '01/2024',
          '01/2024',
          ,
          '01/2024',
          ,
          '01/2024',
          ,
          '01/2024',
          ,
          '01/2024',
          ,
          '01/2024',
          ,
          '01/2024',
        ],
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
      markers: {
        size: 4,
        opacity: 0.9,
        colors: ['#5D87FF'],
        strokeColor: '#fff',
        strokeWidth: 2,

        hover: {
          size: 7,
        },
      },
      yaxis: {
        min: 0,
        max: 40,
      },
      tooltip: {
        theme: 'dark',
      },
      grid: {
        show: false,
      },
    };
  }
}
