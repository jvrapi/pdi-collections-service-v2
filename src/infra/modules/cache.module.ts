import { Module } from '@nestjs/common';
import {
  CacheStore,
  CacheModule as NestJsCacheModule,
} from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    NestJsCacheModule.registerAsync({
      useFactory: async () => {
        const store = (await redisStore({
          database: 1,
          password: process.env.REDIS_PASSWORD,
          ttl: +process.env.REDIS_TTL,
          socket: {
            host: process.env.REDIS_HOST,
            port: +process.env.REDIS_PORT,
          },
        })) as unknown as CacheStore;
        return {
          store,
        };
      },
      isGlobal: true,
    }),
  ],
  exports: [
    NestJsCacheModule.registerAsync({
      useFactory: async () => {
        const store = (await redisStore({
          database: 1,
          password: process.env.REDIS_PASSWORD,
          ttl: +process.env.REDIS_TTL,
          socket: {
            host: process.env.REDIS_HOST,
            port: +process.env.REDIS_PORT,
          },
        })) as unknown as CacheStore;
        return {
          store,
        };
      },
      isGlobal: true,
    }),
  ],
})
export class CacheModule {}
