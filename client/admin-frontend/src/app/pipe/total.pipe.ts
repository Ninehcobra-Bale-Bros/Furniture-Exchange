import { Pipe, PipeTransform } from '@angular/core';
import { IChartRevenue } from '../models/revenue.model';

@Pipe({
  name: 'calculateYearlyTotal',
  standalone: true,
})
export class CalculateYearlyTotalPipe implements PipeTransform {
  transform(chartRevenue: IChartRevenue[]): number {
    return (
      chartRevenue?.reduce((total, month) => total + month.totalRevenue, 0) || 0
    );
  }
}
