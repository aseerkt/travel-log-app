import { Response, NextFunction, Request } from 'express';
import { PROD } from '../constants';

const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    // don't do stack in production
    stack: PROD ? 'pancake' : error.stack,
  });
};

export default errorHandler;
