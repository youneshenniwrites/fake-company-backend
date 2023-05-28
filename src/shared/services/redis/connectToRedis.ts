import { BaseRedisCache } from '@service/redis/baseRedisCache';

class ConnectTodRedis extends BaseRedisCache {
  constructor() {
    super('REDIS CLIENT CONNECTION >>>');
    this.connectToRedisClient();
  }

  public async connectToRedisClient() {
    try {
      if (this.isRedisClientAlreadyRunning()) {
        this.logger.info('REDIS RUNNING');
      } else {
        await this.redisClient.connect();
        this.logger.info('REDIS CONNECTED');
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  private isRedisClientAlreadyRunning() {
    return this.redisClient.isOpen;
  }
}

export const connectToRedis = new ConnectTodRedis();
