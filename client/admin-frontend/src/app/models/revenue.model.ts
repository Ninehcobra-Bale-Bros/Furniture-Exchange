export interface ITotalRevenue {
  total_revenue: number;
  total_sales: number;
  profit?: number;
  delivery_num?: number;
}

export interface IChartRevenue {
  value: number;
  month: string;
  totalRevenue: number;
  totalQuantity: number;
}
