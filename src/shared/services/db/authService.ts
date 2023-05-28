import { AuthDocument } from '@auth/types/authTypes';
import { AuthModel } from '@auth/models/authModelSchema';
import { Helpers } from '@global/helpers/helpers';

class AuthService {
  public async getUserDocumentByUsernameOrEmail(username: string, email: string): Promise<AuthDocument> {
    const query = {
      $or: [{ username: Helpers.capitalizeFirstLetter(username) }, { email: Helpers.lowerCase(email) }]
    };
    const userDocument = (await AuthModel.findOne(query).exec()) as AuthDocument;
    return userDocument;
  }
}

export const authService = new AuthService();
