import { Response } from 'express';
import { extractFormErrors } from './extractFormErrors';

const returnFormErrors = (res: Response, error: any) => {
  if (error.name === 'ValidationError') {
    const formErrors = extractFormErrors(Object.values(error.errors));
    return res.json({ errors: formErrors });
  }
  return;
};

export default returnFormErrors;
