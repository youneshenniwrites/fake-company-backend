import express from "express";
import { FakeCompanyServer } from "./setupServer";
import { connectToDatabase } from "./setupDatabase";

class Application {
  public initialise(): void {
    connectToDatabase();

    const app = express();
    const server = new FakeCompanyServer(app);
    server.start();
  }
}

const application = new Application();

application.initialise();
