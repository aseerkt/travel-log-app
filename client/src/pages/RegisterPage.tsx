import { Form, Formik } from 'formik';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import FormWrapper from '../components/FormWrapper';
import InputField from '../components/InputField';
import { registerUser } from '../services/users';
import handleFormikErrors from '../utils/handleFormikError';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { mutateAsync } = useMutation(registerUser);

  return (
    <FormWrapper title='Sign Up'>
      <Formik
        initialValues={{ fullName: '', email: '', username: '', password: '' }}
        onSubmit={async (values, action) => {
          await mutateAsync(values, {
            onSuccess: (data) => {
              if (data.ok) navigate('/login');
            },
            onError: (err) => handleFormikErrors(err, action),
          });
        }}
      >
        {({
          isSubmitting,
          values: { username, fullName, email, password },
        }) => (
          <Form>
            <InputField label='Full Name' name='fullName' />
            <InputField label='Email' name='email' />
            <InputField label='Username' name='username' />
            <InputField type='password' label='Password' name='password' />
            <button
              type='submit'
              disabled={
                isSubmitting || !fullName || !username || !email || !password
              }
            >
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
      <small>
        Already have an account? <Link to='/login'>Login</Link>
      </small>
    </FormWrapper>
  );
};

export default RegisterPage;
