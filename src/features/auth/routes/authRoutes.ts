import { SignUpUser } from '@auth/controllers/signUpUser';
import express from 'express';

class AuthRoutes {
  private readonly router: express.Router;

  constructor() {
    this.router = express.Router();
  }

  public getRoutes() {
    this.router.post('/signup', SignUpUser.prototype.createUser);

    return this.router;
  }
}

export const authRoutes = new AuthRoutes();
