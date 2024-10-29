export interface ICreateShipmenPayload {
  other_id: string;
  product_id: string;
  other_fullname: string;
  other_phone: string;
  quantity: string;
  pickup_address: string;
  delivery_address: string;
}

export interface ICreateShipmentResponse {
  id: number;
  user_id: string;
  other_id: string;
  deliver_id: string | null;
  product_id: number;
  other_fullname: string;
  other_phone: string;
  pickup_address: string;
  delivery_address: string;
  amount: number;
  quantity: number;
  shipping_fee: number;
  total: number;
  total_after_delivery: number;
  status: string;
  other_confirmed: boolean;
  created_at: string;
  updated_at: string;
  expired_at: string;
}

export type IGetUserAllShipmentResponse = {
  data: IShipment[];
  total: number;
  page: number;
  limit: number;
  total_page: number;
};

export type IGetShipperAllShipmentResponse = IShipment[];

export type IUpdateShipmentStatusPayload = {
  id: string;
  status: 'delivering' | 'delivered' | 'returned';
};

export interface IShipment {
  id: number;
  user_id: string;
  other_id: string;
  deliver_id: string | null;
  product_id: number;
  other_fullname: string;
  other_phone: string;
  pickup_address: string;
  delivery_address: string;
  amount: number;
  quantity: 1;
  shipping_fee: number;
  total: number | null;
  total_after_delivery: number;
  status: string;
  other_confirmed: false;
  created_at: string;
  updated_at: string;
  expired_at: string;
  product: {
    created_at: string;
    deleted_at: null;
    id: number;
    seller_id: string;
    category_id: number;
    name: string;
    slug: string;
    quantity: number;
    kilogram: number;
    description: string;
    image_urls: string[];
    image_ids: string[];
    price: number;
    origin: string;
    address_line: string;
    district: string;
    province: string;
    status: string;
    state: string;
    is_sold: false;
    updated_at: string;
    expired_at: string;
  };
}
