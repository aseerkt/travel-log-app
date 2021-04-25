import { NextFunction, Request, Response } from 'express';
import LogEntry from '../models/LogEntry';

export const fetchAllLogs = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const entries = await LogEntry.find();
    return res.json(entries);
  } catch (error) {
    return next(error);
  }
};

export const addLog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.userId;
    const newLog = new LogEntry({ ...req.body, user: userId });
    const createdEntry = await newLog.save();
    return res.json(createdEntry);
  } catch (error) {
    console.log(error.name);
    if (error.name === 'ValidationError') {
      res.status(422); // Unprocessable Entity
    }
    return next(error);
  }
};
