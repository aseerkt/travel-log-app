import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

const { JWT_SECRET } = process.env;

export function setToken(user: IUser) {
  return jwt.sign({ userId: user._id }, JWT_SECRET!, {
    expiresIn: '7d',
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET!);
}
