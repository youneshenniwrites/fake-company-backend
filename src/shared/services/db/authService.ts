import { IAuthDocument } from '@auth/interfaces/authInterfaces';
import { AuthModel } from '@auth/models/authModelSchema';
import { Helpers } from '@global/helpers/helpers';

class AuthService {
  public async getUserDocumentByUsernameOrEmail(username: string, email: string): Promise<IAuthDocument> {
    const query = {
      $or: [{ username: Helpers.capitalizeFirstLetter(username) }, { email: Helpers.lowerCase(email) }]
    };
    const userDocument = (await AuthModel.findOne(query).exec()) as IAuthDocument;
    return userDocument;
  }
}

export const authService = new AuthService();
