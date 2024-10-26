import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { IChartRevenue, ITotalRevenue } from '../models/revenue.model';

@Injectable({
  providedIn: 'root',
})
export class RevenueService extends BaseService {
  url = 'revenues';

  getSellerReevenue(): Observable<ITotalRevenue> {
    return this.get(`${this.url}/seller`);
  }

  getSellerChartRevenue(): Observable<IChartRevenue[]> {
    return this.get(
      `${this.url}/seller/chart?year=2024&month_from=01&month_to=12`
    );
  }

  getAdminRevenue(): Observable<ITotalRevenue> {
    return this.get(`${this.url}/admin`);
  }

  getAdminChartRevenue(): Observable<IChartRevenue[]> {
    return this.get(
      `${this.url}/admin/chart?year=2024&month_from=01&month_to=12`
    );
  }
}
