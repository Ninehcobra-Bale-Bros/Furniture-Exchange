import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { IChartRevenue, ITotalRevenue } from '../models/revenue.model';
import { IAdminDashboard } from '../models/admin.model.';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends BaseService {
  url = 'admin';

  getAdminDashboard(): Observable<IAdminDashboard> {
    return this.get(`${this.url}/dashboard`);
  }
}
