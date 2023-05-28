import mongoose from 'mongoose';
import { config } from '@root/config/setupConfig';
import { connectToRedis } from '@service/redis/connectToRedis';

export const connectToDatabase = () => {
  const establishConnection = () => {
    mongoose
      .connect(`${config.DATABASE_URL}`)
      .then(() => {
        logger.info('SUCCESSFULLY CONNECTED TO MONGO DB');
        connectToRedis.connectToRedisClient();
      })
      .catch((error) => {
        logger.error('ERROR CONNECTING TO MONGO DB', error);
        return process.exit(1);
      });
  };
  establishConnection();

  mongoose.connection.on('disconnected', establishConnection);
};

const logger = config.createLogger('MONGO DB CONNECTION >>>');
