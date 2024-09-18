import mongoose, {Model} from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  token: string;
}

export interface PostFields {
  user: mongoose.Types.ObjectId;
  title: string;
  description: string | null;
  image: string | null;
  datetime: Date;
}

export interface CommentFields {
  user: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
  text: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;