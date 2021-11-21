import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/tokenHandler';

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authError = new Error('Not Authenticated');
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split('r ')[1] : '';
    if (!token) {
      throw authError;
    }
    const { userId }: any = verifyToken(token);
    res.locals.userId = userId;
    next();
  } catch (err) {
    console.log(`${err.message}`.red.underline);
    next(err);
  }
};

export default isAuth;
