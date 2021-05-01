import { Error } from 'mongoose';

export const extractFormErrors = (errors: Error.ValidatorError[]) => {
  return errors.map(({ properties: { path, message } }) => ({ path, message }));
};
