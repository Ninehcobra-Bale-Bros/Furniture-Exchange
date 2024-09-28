import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { TokenExpiredError } from 'jsonwebtoken';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const title = this.getTitle(exception);

    const httpStatus = this.getHttpStatus(exception);

    const isDevelopment = process.env.NODE_ENV === 'development' ? true : false;

    const responseBody = {
      title: title,
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      method: ctx.getRequest().method,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: exception.message,
      ...(isDevelopment ? { trace: exception.stack } : {}),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  private getTitle(exception: any) {
    if (exception instanceof HttpException) {
      return exception.message;
    }

    if (exception instanceof TokenExpiredError) {
      return 'Token expired';
    }

    return 'Internal server error';
  }

  private getHttpStatus(exception: any) {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }

    if (exception instanceof TokenExpiredError) {
      return HttpStatus.UNAUTHORIZED;
    }

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
