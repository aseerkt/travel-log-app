import { FormikHelpers } from 'formik';
import { FormError } from '../types/Error';
import getAxiosError from './getAxiosError';

function handleFormikErrors(error: unknown, action: FormikHelpers<any>) {
  const { errors } = getAxiosError(error);
  (errors as FormError[]).forEach(({ path, message }) => {
    action.setFieldError(path, message);
  });
}

export default handleFormikErrors;
