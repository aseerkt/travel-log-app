import { ObjectId } from 'mongodb';

declare global {
  namespace Express {
    interface Response {
      locals: {
        userId?: ObjectId;
      };
    }
  }
}
