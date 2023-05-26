import dotenv from 'dotenv';
import bunyan from 'bunyan';
import cloudinary from 'cloudinary';

dotenv.config({});

class Config {
  public readonly SERVER_PORT: string | undefined;
  public readonly DATABASE_URL: string | undefined;
  public readonly JWT_TOKEN: string | undefined;
  public readonly NODE_ENV: string | undefined;
  public readonly SECRET_KEY_ONE: string | undefined;
  public readonly SECRET_KEY_TWO: string | undefined;
  public readonly CLIENT_URL: string | undefined;
  public readonly REDIS_HOST: string | undefined;
  public readonly CLOUD_NAME: string | undefined;
  public readonly CLOUD_API_KEY: string | undefined;
  public readonly CLOUD_API_SECRET: string | undefined;
  public readonly SENDER_EMAIL: string | undefined;
  public readonly SENDER_EMAIL_PASSWORD: string | undefined;
  public readonly SENDGRID_API_KEY: string | undefined;
  public readonly SENDGRID_SENDER: string | undefined;
  public readonly EC2_URL: string | undefined;
  public readonly SALT_ROUND: string | undefined;

  constructor() {
    this.SERVER_PORT = process.env.SERVER_PORT;
    this.DATABASE_URL = process.env.DATABASE_URL;
    this.JWT_TOKEN = process.env.JWT_TOKEN;
    this.NODE_ENV = process.env.NODE_ENV;
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE;
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO;
    this.CLIENT_URL = process.env.CLIENT_URL;
    this.REDIS_HOST = process.env.REDIS_HOST;
    this.CLOUD_NAME = process.env.CLOUD_NAME;
    this.CLOUD_API_KEY = process.env.CLOUD_API_KEY;
    this.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;
    this.SENDER_EMAIL = process.env.SENDER_EMAIL;
    this.SENDER_EMAIL_PASSWORD = process.env.SENDER_EMAIL_PASSWORD;
    this.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    this.SENDGRID_SENDER = process.env.SENDGRID_SENDER;
    this.EC2_URL = process.env.EC2_URL;
    this.SALT_ROUND = process.env.SALT_ROUND;
  }

  public createLogger(name: string) {
    return bunyan.createLogger({ name, level: 'debug' });
  }

  public validateConfig() {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`The value of configuration ${key} is undefined. Please provide one to proceed.`);
      }
    }
  }

  public cloudinaryConfig() {
    cloudinary.v2.config({
      cloud_name: this.CLOUD_NAME,
      api_key: this.CLOUD_API_KEY,
      api_secret: this.CLOUD_API_SECRET
    });
  }
}

export const config = new Config();
