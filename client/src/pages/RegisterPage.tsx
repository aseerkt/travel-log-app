import { Form, Formik } from 'formik';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import FormWrapper from '../components/FormWrapper';
import InputField from '../components/InputField';
import { registerUser } from '../services/users';

const RegisterPage = () => {
  const history = useHistory();
  const { mutateAsync } = useMutation(registerUser);
  return (
    <FormWrapper title='Sign Up'>
      <Formik
        initialValues={{ fullName: '', email: '', username: '', password: '' }}
        onSubmit={async (values, action) => {
          const res = await mutateAsync(values);
          const { errors, ok } = res;
          if (errors) {
            (errors as [{ path: string; message: string }]).forEach(
              ({ path, message }) => {
                action.setFieldError(path, message);
              }
            );
          } else if (ok) {
            history.push('/login');
          }
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
    </FormWrapper>
  );
};

export default RegisterPage;
