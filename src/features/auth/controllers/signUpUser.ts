import { Request } from 'express';
import { signUpSchema } from '@auth/schemas/signUpJoiSchema';
import { validateWithJoiDecorator } from '@global/decorators/validateWithJoiDecorator';
import { BadRequestError } from '@global/helpers/handleErrors';
import { authService } from '@service/db/authService';

export class SignUpUser {
  @validateWithJoiDecorator<SignUpUser>(signUpSchema)
  public async createUser(req: Request): Promise<void> {
    const { username, email } = req.body;
    const getUserDocument = await authService.getUserDocumentByUsernameOrEmail(username, email);
    const doesUserAlreadyExist = Object.keys(getUserDocument).length === 0;
    if (doesUserAlreadyExist) {
      throw new BadRequestError('Invalid credentials');
    }
  }
}
