import Logger from 'bunyan';
import { createClient } from 'redis';
import { config } from '@root/config/setupConfig';

export type RedisClient = ReturnType<typeof createClient>;

export abstract class BaseRedisCache {
  public readonly redisClient: RedisClient;
  public readonly logger: Logger;

  constructor(cacheName: string) {
    this.redisClient = createClient({
      url: config.REDIS_HOST
    });
    this.logger = config.createLogger(cacheName);
    this.cacheError();
  }

  private cacheError() {
    this.redisClient.on('error', (error: unknown) => {
      this.logger.error(error);
    });
  }
}
