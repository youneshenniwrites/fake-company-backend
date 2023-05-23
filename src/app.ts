import express from "express";
import { FakeCompanyServer } from "./setupServer";
import { connectToDatabase } from "./setupDatabase";
import { config } from "./config";

class Application {
  public initialise(): void {
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
