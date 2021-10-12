import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import returnFormErrors from '../utils/resMongoErrors';
import { setToken } from '../utils/tokenHandler';

export const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({});
    return res.json({ users });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

export const getCurrentUser = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = res.locals;
    const user = await User.findById(userId).select('-password');
    return res.json({ user });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (!(await user.verifyPassword(password))) {
      return res.status(400).json({ message: 'Incorrect Password' });
    }
    const jwt = setToken(user);
    const userToReturn = user.toJSON();
    return res.json({ user: userToReturn, jwt });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fullName, username, email, password } = req.body;
  try {
    const user = new User({ fullName, username, email, password });
    await user.save();
    return res.json({ ok: true });
  } catch (error) {
    returnFormErrors(res, error);
    return next(error);
  }
};
