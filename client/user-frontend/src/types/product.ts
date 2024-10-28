export interface IProduct {
  created_at: string
  deleted_at: null
  id: number
  seller_id: string
  category_id: number
  name: string
  quantity: number
  description: string
  image_urls: string[]
  image_ids: string[]
  price: number
  origin: string
  address_line: string
  district: string
  province: string
  status: string
  state: string
  updated_at: string
  expired_at: string
  category_name?: string
  slug: string
  seller: {
    created_at: string
    deleted_at: null | string
    id: string
    CCCD: null | string
    email: string
    email_verified: true
    first_name: string
    last_name: string
    sex: string
    image_url: string
    image_id: string
    phone_number: string
    address_line1: null | string
    address_line2: null | string
    role: string
    updated_at: string
  }
}

export interface ICreateProductPayload {
  name: string
  description: string
  image_urls: string[]
  image_files: File[]
  price: number
  quantity: number
  origin: string
  address_line: string
  district: string
  province: string
  category_id: number
  expired_at: string
}
