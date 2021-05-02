import { Form, Formik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import { addLogEntry } from '../services/logs';
import { FormError } from '../types/FormError';
import InputField from './InputField';

type AddLogEntryFormProps = {
  location: {
    latitude: number;
    longitude: number;
  };
  onClose: Function;
};

const AddLogEntryForm: React.FC<AddLogEntryFormProps> = ({
  location: { latitude, longitude },
  onClose,
}) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(addLogEntry);

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        comments: '',
        rating: 5,
        visitDate: '',
      }}
      onSubmit={async (values, action) => {
        try {
          await mutateAsync(
            { ...values, latitude, longitude },
            {
              onSuccess: (data) => {
                const { errors } = data;
                if (errors) {
                  (errors as FormError).forEach(({ path, message }) =>
                    action.setFieldError(path, message)
                  );
                } else {
                  queryClient.invalidateQueries('logEntries');
                  onClose();
                }
              },
            }
          );
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField name='title' label='Title' />
          <InputField name='description' textarea label='Description' />
          <InputField name='comments' label='Comments' />
          <InputField
            type='number'
            name='rating'
            min={1}
            max={10}
            label='Rating'
          />
          <InputField type='date' name='visitDate' label='Visit Date' />
          <button type='submit' disabled={isSubmitting}>
            Add Log
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddLogEntryForm;
