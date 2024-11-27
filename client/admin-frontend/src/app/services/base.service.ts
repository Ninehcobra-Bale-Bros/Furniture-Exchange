import { isPlatformServer } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  dynamicURL = environment.API_URL;
  protected customHeaders = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  constructor(
    protected http: HttpClient,
    @Inject(PLATFORM_ID) public platformId: string
  ) {
    if (isPlatformServer(this.platformId)) {
      this.dynamicURL = environment.API_URL;
    }
  }

  get<T = {}>(url: string, options?: any) {
    return this.http
      .get(`${this.dynamicURL}/${url}`, {
        ...this.customHeaders,
        ...options,
        responseType: 'json',
      })
      .pipe(
        map((response) => response as T),
        catchError(this.handleError)
      );
  }

  post<T = {}>(url: string, body: any, options?: any) {
    return this.http
      .post<T>(`${this.dynamicURL}/${url}`, body, {
        ...this.customHeaders,
        ...options,
        responseType: 'json',
      })
      .pipe(
        map((response) => response as T),
        catchError(this.handleError)
      );
  }

  // New method for handling multipart/form-data
  postFormData<T = {}>(
    url: string,
    formData: FormData,
    options?: any
  ): Observable<T> {
    return this.http
      .post<T>(`${this.dynamicURL}/${url}`, formData, {
        ...options, // Do not include customHeaders to avoid setting Content-Type
      })
      .pipe(
        map((response) => response as T),
        catchError(this.handleError)
      );
  }

  patch<T = {}>(url: string, body: any, options?: any) {
    return this.http
      .patch<T>(`${this.dynamicURL}/${url}`, body, {
        ...this.customHeaders,
        ...options,
        responseType: 'json',
      })
      .pipe(
        map((response) => response as T),
        catchError(this.handleError)
      );
  }

  protected handleError(error: any) {
    return throwError(() => error);
  }
}
