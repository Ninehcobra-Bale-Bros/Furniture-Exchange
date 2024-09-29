import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { TokenExpiredError } from 'jsonwebtoken';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const title = this.getTitle(exception);

    const httpStatus = this.getHttpStatus(exception);

    const typeError = this.getTypeError(exception);

    const isValidationError = Array.isArray(exception.getResponse()['message']);

    const isDevelopment = process.env.NODE_ENV === 'development' ? true : false;

    const responseBody = {
      title: title,
      type: typeError,
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      method: ctx.getRequest().method,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: exception.message,
      ...(isValidationError
        ? {
            validation_errors: this.formatValidationErrors(
              exception.getResponse()['message'],
            ),
          }
        : {}),
      ...(isDevelopment ? { trace: exception.stack } : {}),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  private getTitle(exception: any) {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();

      if (Array.isArray(response['message'])) {
        return 'Validation error';
      }

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

  private getTypeError(exception: any) {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();

      if (Array.isArray(response['message'])) {
        return 'ValidationError';
      }

      return 'HttpException';
    }

    if (exception instanceof TokenExpiredError) {
      return 'TokenError';
    }

    return 'InternalServerError';
  }

  private formatValidationErrors(
    validationErrors: ValidationError[],
  ): object[] {
    console.log(validationErrors);

    // Custom logic to format validation errors
    return validationErrors.map((error: ValidationError) => {
      const field = error.toString().split(' ')[0];

      return {
        field: field,
        constraints: error,
      };
    });
  }
}
