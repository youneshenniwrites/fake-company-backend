import express from 'express';
import { FakeCompanyServer } from '@root/server/setupServer';
import { connectToDatabase } from '@root/database/setupDatabase';
import { config } from '@root/config/setupConfig';

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
