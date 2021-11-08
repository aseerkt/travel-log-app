import { FormikProps } from 'formik';
import { useEffect, useRef } from 'react';
import getAxiosError from '../utils/getAxiosError';

function useFormikErrors(error: unknown) {
  const formikRef = useRef<FormikProps<any>>(null);

  useEffect(() => {
    if (error) {
      const { errors } = getAxiosError(error);
      (errors as [{ path: string; message: string }]).forEach(
        ({ path, message }) => {
          formikRef?.current?.setFieldError(path, message);
        }
      );
    }
  }, [error]);

  return { formikRef };
}

export default useFormikErrors;
