import { CacheModule, CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from '../../environments/env.interface';
import { redisStore } from 'cache-manager-redis-store';
import { RedisService } from './redis.service';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  inject: [ConfigService],
  useFactory: async (config: ConfigService<EnvVariables>) => {
    const store = await redisStore({
      socket: {
        host: config.get('REDIS_HOST'),
        port: config.get('REDIS_PORT'),
      },
      ttl: 10 * 1000, // miliseconds
    });
    return {
      store: () => store,
    };
  },
};

@Global()
@Module({
  imports: [CacheModule.registerAsync(RedisOptions)],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
