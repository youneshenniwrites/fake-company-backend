import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { signUpSchema } from '@auth/schemas/signUpJoiSchema';
import { validateWithJoiDecorator } from '@global/decorators/validateWithJoiDecorator';
import { BadRequestError } from '@global/helpers/handleErrors';
import { authService } from '@service/db/authService';
import { ObjectId } from 'mongodb';
import { Helpers } from '@global/helpers/helpers';
import { AuthDocument, SignUpData } from '@auth/types/authTypes';
import { uploadFileToCloudinary } from '@global/helpers/uploadToCloudinary';
import { UploadApiResponse } from 'cloudinary';
import { UserDocument } from '@user/types/userTypes';
import { userCache } from '@service/redis/userCache';

export class SignUpUser {
  @validateWithJoiDecorator<SignUpUser>(signUpSchema)
  public async createUser(req: Request, res: Response): Promise<void> {
    const { username, email, password, avatarImage, avatarColor } = req.body;

    const doesUserAlreadyExist = await authService.getUserDocumentByUsernameOrEmail(username, email);
    if (doesUserAlreadyExist) {
      throw new BadRequestError('User already exist!');
    }

    const authObjectId = new ObjectId(); // document ID for mongoDB
    const userObjectId = new ObjectId(); // user ID for mongoDB
    const uId = `${Helpers.generateRandomIntegers(12)}`;
    const signUpData = SignUpUser.prototype.createSignupData({
      _id: authObjectId,
      uId,
      username,
      email,
      password,
      avatarColor
    });

    const uploadAvatarImage = (await uploadFileToCloudinary(avatarImage, `${userObjectId}`, true, true)) as UploadApiResponse;
    const uploadAvatarImageNotSuccessful = !uploadAvatarImage.public_id;

    if (uploadAvatarImageNotSuccessful) {
      throw new BadRequestError('Could not upload your avatar image. Please try again.');
    }

    //* Save user to Redis cache
    const signUpDataForCache = SignUpUser.prototype.createSignupDataForCache(signUpData, userObjectId);
    await userCache.saveUserToRedisCache(userObjectId.toString(), uId, signUpDataForCache);

    res.status(HTTP_STATUS.CREATED).json({ message: 'User created sucessfully: ', signUpData });
  }

  private createSignupData(signUpData: SignUpData): AuthDocument {
    const { _id, username, email, uId, password, avatarColor } = signUpData;
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

  private createSignupDataForCache(signUpData: AuthDocument, userObjectId: ObjectId): UserDocument {
    const { _id, username, email, uId, password, avatarColor } = signUpData;
    return {
      _id: userObjectId,
      authId: _id,
      uId,
      username: Helpers.capitalizeFirstLetter(username),
      email,
      password,
      avatarColor,
      profilePicture: '',
      blocked: [],
      blockedBy: [],
      work: '',
      location: '',
      school: '',
      quote: '',
      bgImageVersion: '',
      bgImageId: '',
      followersCount: 0,
      followingCount: 0,
      postsCount: 0,
      notifications: {
        messages: true,
        reactions: true,
        comments: true,
        follows: true
      },
      social: {
        facebook: '',
        instagram: '',
        twitter: '',
        youtube: ''
      }
    } as unknown as UserDocument;
  }
}
