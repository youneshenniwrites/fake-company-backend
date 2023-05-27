import { SignUpUser } from '@auth/controllers/signUpUser';
import express from 'express';

class AuthRoutes {
  private readonly router: express.Router;

  constructor() {
    this.router = express.Router();
    this.defineRoutes();
  }

  public getRoutes() {
    return this.router;
  }

  private defineRoutes() {
    this.router.post('/signup', SignUpUser.prototype.createUser);
  }
}

export const authRoutes = new AuthRoutes();
