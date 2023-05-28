import mongoose, { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export type UserDocument = Document & {
  _id: string | ObjectId;
  authId: string | ObjectId;
  username?: string;
  email?: string;
  password?: string;
  avatarColor?: string;
  uId?: string;
  postsCount: number;
  work: string;
  school: string;
  quote: string;
  location: string;
  blocked: mongoose.Types.ObjectId[];
  blockedBy: mongoose.Types.ObjectId[];
  followersCount: number;
  followingCount: number;
  notifications: NotificationSettings;
  social: SocialLinks;
  bgImageVersion: string;
  bgImageId: string;
  profilePicture: string;
  passwordResetToken?: string;
  passwordResetExpires?: number | string;
  createdAt?: Date;
};

export type ResetPasswordParams = {
  username: string;
  email: string;
  ipaddress: string;
  date: string;
};

export type NotificationSettings = {
  messages: boolean;
  reactions: boolean;
  comments: boolean;
  follows: boolean;
};

export type BasicInfo = {
  quote: string;
  work: string;
  school: string;
  location: string;
};

export type SocialLinks = {
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
};

export type SearchUser = {
  _id: string;
  profilePicture: string;
  username: string;
  email: string;
  avatarColor: string;
};

export type SocketData = {
  blockedUser: string;
  blockedBy: string;
};

export type Login = {
  userId: string;
};

export type UserJobInfo = {
  key?: string;
  value?: string | SocialLinks;
};

export type UserJob = {
  keyOne?: string;
  keyTwo?: string;
  key?: string;
  value?: string | NotificationSettings | UserDocument;
};

export type EmailJob = {
  receiverEmail: string;
  template: string;
  subject: string;
};

export type AllUsers = {
  users: UserDocument[];
  totalUsers: number;
};
