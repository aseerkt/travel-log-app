import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/tokenHandler';

const isUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authError = new Error('Not Authenticated');
    const token = req.headers.authorization?.split('Bearer ')[1] || undefined;
    if (!token) {
      throw authError;
    }
    const { userId }: any = verifyToken(token);
    res.locals.userId = userId;
  } catch (err) {
    console.log(`${err.message}`.red.underline);
  }
  return next();
};

export default isUser;
