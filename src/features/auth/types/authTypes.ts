import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { UserDocument } from '@user/types/userTypes';

declare global {
  namespace Express {
    interface Request {
      currentUser?: AuthPayload;
    }
  }
}

export type AuthPayload = {
  userId: string;
  uId: string;
  email: string;
  username: string;
  avatarColor: string;
  iat?: number;
};

export type AuthDocument = Document & {
  _id: string | ObjectId;
  uId: string;
  username: string;
  email: string;
  password?: string;
  avatarColor: string;
  createdAt: Date;
  passwordResetToken?: string;
  passwordResetExpires?: number | string;
  comparePassword(password: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
};

export type SignUpData = {
  _id: ObjectId;
  uId: string;
  email: string;
  username: string;
  password: string;
  avatarColor: string;
};

export type AuthJob = {
  value?: string | AuthDocument | UserDocument;
};
