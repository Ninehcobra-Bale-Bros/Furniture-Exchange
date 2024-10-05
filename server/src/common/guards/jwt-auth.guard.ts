import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { APP_CONSTANTS } from '../constants/app.constant';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      APP_CONSTANTS.IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  // handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
  //   // You can throw an exception based on either "info" or "err" arguments
  //   if (err || !user) {
  //     new UnauthorizedException();
  //   }
  //   return user;
  // }
}
