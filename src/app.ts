import express from "express";
import { FakeCompanyServer } from "./setupServer";

class Application {
  public initialise(): void {
    const app = express();
    const server = new FakeCompanyServer(app);
    server.start();
  }
}

const application = new Application();

application.initialise();
