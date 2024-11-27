import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { ICreateProductPayload, IProduct } from '../models/product.model';
import { IGetProductByCategorySlugResponse } from '../models/category.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  url = 'products';

  createProduct(payload: ICreateProductPayload): Observable<any> {
    const formData = new FormData();

    // Append each field to the FormData object
    formData.append('name', payload.name);
    formData.append('description', payload.description);
    formData.append('price', payload.price.toString());
    formData.append('quantity', payload.quantity.toString());
    formData.append('origin', payload.origin);
    formData.append('address_line', payload.address_line);
    formData.append('district', payload.district);
    formData.append('province', payload.province);
    formData.append('state', payload.state);
    formData.append('category_id', payload.category_id.toString());

    // Convert expired_at to ISO 8601 format
    const expiredAtFormatted = this.formatDateToCustomTimezone(
      payload.expired_at,
      7
    );
    formData.append('expired_at', expiredAtFormatted);

    formData.append('kilogram', payload.kilogram.toString());

    // Append image URLs if any
    if (payload.image_urls) {
      const imageUrlsString = payload.image_urls.join(',');
      formData.append('image_urls', imageUrlsString);
    }

    return this.postFormData(`${this.url}`, formData);
  }
  getAllProducts(): Observable<IProduct[]> {
    return this.get(this.url);
  }

  getProductBySlug(slug: string): Observable<IProduct> {
    return this.get(`${this.url}/${slug}`);
  }

  getSellerProducts(): Observable<IProduct[]> {
    return this.get(`${this.url}/seller`);
  }

  private formatDateToCustomTimezone(
    dateString: string,
    offsetHours: number
  ): string {
    const date = new Date(dateString);

    // Calculate the timezone offset in milliseconds
    const offsetMilliseconds = offsetHours * 60 * 60 * 1000;

    // Adjust the date by the timezone offset
    const localDate = new Date(date.getTime() + offsetMilliseconds);

    // Format the date components
    const year = localDate.getUTCFullYear();
    const month = String(localDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(localDate.getUTCDate()).padStart(2, '0');
    const hours = String(localDate.getUTCHours()).padStart(2, '0');
    const minutes = String(localDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(localDate.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(localDate.getUTCMilliseconds()).padStart(
      3,
      '0'
    );

    // Format the timezone offset
    const offsetSign = offsetHours >= 0 ? '+' : '-';
    const offset = `${offsetSign}${String(Math.abs(offsetHours)).padStart(
      2,
      '0'
    )}:00`;

    // Construct the final formatted string
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds} ${offset}`;
  }
}
