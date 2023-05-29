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

// * FP Equivalent
// import express from 'express';

// const createAuthRoutes = () => {
//   const router = express.Router();

//   router.post('/signup', SignUpUser.prototype.createUser);

//   return router;
// };

// export const authRoutes = createAuthRoutes();
