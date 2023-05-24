import express from 'express';
import { FakeCompanyServer } from './server/setupServer';
import { connectToDatabase } from './database/setupDatabase';
import { config } from './config/setupConfig';

class Application {
  public initialise() {
    this.loadConfig();

    connectToDatabase();

    const app = express();
    const server = new FakeCompanyServer(app);
    server.start();
  }

  private loadConfig() {
    config.validateConfig();
  }
}

const application = new Application();

application.initialise();
