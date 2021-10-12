import { ResError } from './Error';

export interface UserDoc {
  _id: string;
  email: string;
  fullName: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PublicUserDoc {
  _id: string;
  fullName: string;
}

export interface AuthResponse extends ResError {
  user?: UserDoc;
  jwt?: string;
}
