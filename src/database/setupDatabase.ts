import mongoose from 'mongoose';
import { config } from '@root/config/setupConfig';

export const connectToDatabase = () => {
  const establishConnection = () => {
    mongoose
      .connect(`${config.DATABASE_URL}`)
      .then(() => logger.info('Successfully connected to database'))
      .catch((error) => {
        logger.error('Error connecting to database', error);
        return process.exit(1);
      });
  };
  establishConnection();

  mongoose.connection.on('disconnected', establishConnection);
};

const logger = config.createLogger('FAKE COMPANY DATABASE >>>');
