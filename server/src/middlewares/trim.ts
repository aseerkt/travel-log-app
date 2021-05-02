import { NextFunction, Request, Response } from 'express';

const trim = (req: Request, _res: Response, next: NextFunction) => {
  let trimmedVars: Record<string, string> = {};
  Object.entries(req.body as Record<string, string>).forEach(([k, v]) => {
    if (typeof v === 'string') {
      trimmedVars[k] = v.trim();
    } else {
      trimmedVars[k] = v;
    }
  });
  req.body = trimmedVars;
  next();
};

export default trim;
