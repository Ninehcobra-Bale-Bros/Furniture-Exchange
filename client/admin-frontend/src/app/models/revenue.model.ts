export interface ITotalRevenue {
  total_revenue: number;
  total_sales: number;
  profit?: number;
  delivery_num?: number;
}

export interface IChartRevenue {
  month: string;
  total_revenue: number;
  totalQuantity: number;
}
