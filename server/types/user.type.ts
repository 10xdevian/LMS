import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avator: {
    public_id: string;
    url: string;
  };

  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  comparePassword: (password: string) => Promise<boolean>;
}

export interface IregistrationBody {
  name: string;
  email: string;
  password: string;
  avator?: string;
}

export interface IsActivationToken {
  token: string;
  activationCode: string;
}

export interface EmailOptions {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
}
