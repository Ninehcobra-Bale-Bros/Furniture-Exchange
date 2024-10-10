import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService // Assuming you have an AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred';

        switch (error.status) {
          case 400:
            errorMessage = error.error.messages[0];
            break;
          case 401:
            errorMessage = 'Session expired. Please login again.';
            this.authService.logout(); // Clear token and user data
            this.router.navigate(['/authentication/side-login']);
            this.toastService.showError(errorMessage);
            break;
          case 403:
            errorMessage = 'You do not have permission to access this resource';
            this.toastService.showError(errorMessage);
            break;
          case 404:
            errorMessage = 'The requested resource was not found';
            this.toastService.showError(errorMessage);
            break;
          case 500:
            errorMessage = 'Internal Server Error. Please try again later';
            this.toastService.showError(errorMessage);
            break;
          default:
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        return throwError(errorMessage);
      })
    );
  }
}
