import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class DiscountTransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();

    if (
      request.body.discount_percent &&
      typeof request.body.discount_percent === 'string'
    ) {
      request.body.discount_percent = Number(request.body.discount_percent);
    }

    return next.handle();
  }
}
