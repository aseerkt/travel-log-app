import { NextFunction, Request, Response } from 'express';
import LogEntry from '../models/LogEntry';
import returnFormErrors from '../utils/resMongoErrors';

export const fetchMyLogs = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = res.locals;
    const entries = await LogEntry.find({ user: userId });
    return res.json(entries);
  } catch (error) {
    return next(error);
  }
};

export const fetchAllLogs = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const entries = await LogEntry.find().sort({ createdAt: -1 });
    return res.json(entries);
  } catch (error) {
    return next(error);
  }
};

export const fetchOneLog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const entries = await LogEntry.findById(id);
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
    const newLog = new LogEntry({ ...req.body, user: res.locals.userId });
    const createdEntry = await newLog.save();
    return res.json(createdEntry);
  } catch (error) {
    console.log(error.name);
    return returnFormErrors(res, next, error);
  }
};

export const deleteLog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.params.id, res.locals.userId);
    const deleteResult = await LogEntry.deleteOne({
      _id: req.params.id,
      user: res.locals.userId,
    });
    console.log(deleteResult);
    if (deleteResult?.deletedCount && deleteResult.deletedCount > 0) {
      return res.json({ message: 'Log deleted successfully' });
    }
    return res.status(400).json({ message: 'Log delete failed' });
  } catch (error) {
    return returnFormErrors(res, next, error);
  }
};
