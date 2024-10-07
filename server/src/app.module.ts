import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { configurationOptions } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormService } from './config/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { RateLimitingService } from './config/rate-limit';
import { RedisModule } from './config/cache/redis.module';
import { RedisService } from './config/cache/redis.service';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { MailModule } from './config/mail/mail.module';
import { CloudinaryModule } from './config/upload/cloudinary.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { DiscountModule } from './modules/discounts/discounts.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { SocketModule } from './config/websocket/socket.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { VnpayModule } from './config/vnpay/vnpay.module';

@Module({
  imports: [
    // Configuration environment variables
    ConfigModule.forRoot(configurationOptions),
    TypeOrmModule.forRootAsync({
      useClass: TypeormService,
    }),
    // Rate limiting
    ThrottlerModule.forRootAsync({
      useClass: RateLimitingService,
    }),
    // Mail module
    MailModule,
    // cloudinary module
    CloudinaryModule,
    // cache module for caching data in redis
    RedisModule,
    // websocket module
    SocketModule,
    // Vnpay module
    VnpayModule,
    // other business modules

    UsersModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    DiscountModule,
    ConversationsModule,
    PaymentsModule,

    // internal cache (RAM)
    // CacheModule.registerAsync({
    //   isGlobal: true,
    //   useClass: CacheService,
    // }),
  ],
  providers: [AppService, RedisService], // Add RedisService here
  exports: [RedisService], // Export RedisService to be used in other modules
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
