import { Form, Formik } from 'formik';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import useAddLogMutation from '../hooks/mutations/useAddLogMutation';
import InputField from './InputField';
import './AddLogEntryForm.css';
import handleFormikErrors from '../utils/handleFormikError';

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
  const navigate = useNavigate();

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
              onSuccess: async (data) => {
                if (!!data.errors?.length) {
                  console.log('made it here');
                  data.errors.forEach(({ path, message }) =>
                    action.setFieldError(path, message)
                  );
                  return;
                }

                await queryClient.invalidateQueries('myLogs');
                navigate(`/logs/${data._id}`);
              },
              onError: (err) => handleFormikErrors(err, action),
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
            <InputField
              type='date'
              name='visitDate'
              label='Visit Date'
              max={new Date().toString()}
            />
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
