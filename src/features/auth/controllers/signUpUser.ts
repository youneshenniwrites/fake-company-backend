import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { signUpSchema } from '@auth/schemas/signUpJoiSchema';
import { validateWithJoiDecorator } from '@global/decorators/validateWithJoiDecorator';
import { BadRequestError } from '@global/helpers/handleErrors';
import { authService } from '@service/db/authService';
import { ObjectId } from 'mongodb';
import { Helpers } from '@global/helpers/helpers';
import { AuthDocument, SignUpData } from '@auth/types/auth';
import { uploadToCloudinary } from '@global/helpers/uploadToCloudinary';
import { UploadApiResponse } from 'cloudinary';

export class SignUpUser {
  @validateWithJoiDecorator<SignUpUser>(signUpSchema)
  public async createUser(req: Request, res: Response): Promise<void> {
    const { username, email, password, avatarImage, avatarColor } = req.body;
    const doesUserAlreadyExist = await authService.getUserDocumentByUsernameOrEmail(username, email);

    if (doesUserAlreadyExist) {
      throw new BadRequestError('Invalid credentials');
    }

    const authObjectId = new ObjectId(); // document ID for mongoDB
    const userObjectId = new ObjectId(); // user ID for mongoDB
    const uId = `${Helpers.generateRandomIntegers(12)}`;
    const authData = SignUpUser.prototype.signupData({
      _id: authObjectId,
      uId,
      username,
      email,
      password,
      avatarColor
    });

    const cloudinaryUploadResult = (await uploadToCloudinary(avatarImage, `${userObjectId}`, true, true)) as UploadApiResponse;

    if (!cloudinaryUploadResult.public_id) {
      throw new BadRequestError('File upload: Error occurred. Try again.');
    }

    res.status(HTTP_STATUS.CREATED).json({ message: 'User creted sucessfully', authData });
  }

  private signupData(data: SignUpData): AuthDocument {
    const { _id, username, email, uId, password, avatarColor } = data;
    return {
      _id,
      uId,
      username: Helpers.capitalizeFirstLetter(username),
      email: Helpers.lowerCase(email),
      password,
      avatarColor,
      createdAt: new Date()
    } as unknown as AuthDocument;
  }
}
