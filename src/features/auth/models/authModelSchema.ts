import { hash, compare } from 'bcryptjs';
import { IAuthDocument } from '@auth/interfaces/authInterfaces';
import { model, Model, Schema } from 'mongoose';
import { config } from '@root/config/setupConfig';

const SALT_ROUND = Number(config.SALT_ROUND);

const authModelSchema: Schema = new Schema(
  {
    username: { type: String },
    uId: { type: String },
    email: { type: String },
    password: { type: String },
    avatarColor: { type: String },
    createdAt: { type: Date, default: Date.now },
    passwordResetToken: { type: String, default: '' },
    passwordResetExpires: { type: Number }
  },
  {
    toJSON: {
      transform(_doc, retrieve) {
        delete retrieve.password;
        return retrieve;
      }
    }
  }
);

authModelSchema.pre('save', async function (this: IAuthDocument, next: () => void) {
  const hashedPassword: string = await hash(this.password as string, SALT_ROUND);
  this.password = hashedPassword;
  next();
});

authModelSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  const hashedPassword: string = (this as unknown as IAuthDocument).password!;
  return compare(password, hashedPassword);
};

authModelSchema.methods.hashPassword = async function (password: string): Promise<string> {
  return hash(password, SALT_ROUND);
};

const AuthModel: Model<IAuthDocument> = model<IAuthDocument>('Auth', authModelSchema, 'Auth');
export { AuthModel };
