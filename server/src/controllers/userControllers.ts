import { NextFunction, Request, Response } from 'express';
import User from '../models/User';

export const registerUser = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (error) {
    return next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fullName, username, email, password } = req.body;

  try {
    const user = new User({ fullName, username, email, password });
    await user.save();
    return res.json(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.log(error.errors.fullName.properties);
      res.status(422); // Unprocessable Entity
    }
    return next(error);
  }
};
