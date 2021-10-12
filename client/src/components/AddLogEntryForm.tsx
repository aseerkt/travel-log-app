import { Form, Formik } from 'formik';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import useAddLogMutation from '../hooks/mutations/useAddLogMutation';
import InputField from './InputField';
import './AddLogEntryForm.css';

type AddLogEntryFormProps = {
  location: {
    latitude: number;
    longitude: number;
  };
};

const AddLogEntryForm: React.FC<AddLogEntryFormProps> = ({
  location: { latitude, longitude },
}) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useAddLogMutation();
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        comments: '',
        rating: 0,
        visitDate: '',
      }}
      onSubmit={async (values, action) => {
        try {
          await mutateAsync(
            { ...values, latitude, longitude },
            {
              onSuccess: (data) => {
                if (data.errors?.length) {
                  data.errors.forEach(({ path, message }) =>
                    action.setFieldError(path, message)
                  );
                  return;
                }

                queryClient.invalidateQueries('myLogs');
                history.push(`/logs/${data._id}`);
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
          <div className='form-grid-2'>
            <InputField
              type='number'
              name='rating'
              min={0}
              max={5}
              label='Rating'
            />
            <InputField type='date' name='visitDate' label='Visit Date' />
          </div>
          <button type='submit' disabled={isSubmitting}>
            Add Log
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddLogEntryForm;
