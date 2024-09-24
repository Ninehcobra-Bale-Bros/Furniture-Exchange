import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configurationOptions } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormService } from './config/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { RateLimitingService } from './config/rate-limit';
import { RedisModule, RedisOptions } from './config/cache/redis.module';
import { RedisService } from './config/cache/redis.service';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { MailModule } from './config/mail/mail.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CloudinaryModule } from './config/upload/cloudinary.module';

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
    // Redis cache
    RedisModule,
    // cloudinary module
    CloudinaryModule,
    // other business modules
    UsersModule,
    AuthModule,
    MailModule,

    // cache module for caching data in redis
    CacheModule.registerAsync(RedisOptions),

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
