import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import FormWrapper from '../components/FormWrapper';
import InputField from '../components/InputField';
import { useAuthDispatch } from '../context/AuthContext';
import { loginUser } from '../services/users';
import './LoginPage.css';

const LoginPage = () => {
  const { mutateAsync } = useMutation(loginUser);
  const [errMsg, setErrMsg] = useState('');
  const dispatch = useAuthDispatch();
  const history = useHistory();

  return (
    <FormWrapper title='Login'>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, _action) => {
          setErrMsg('');
          const res = await mutateAsync(values);
          console.log(res);
          const { user, jwt } = res;
          if (res.message) {
            setErrMsg(res.message);
          }
          if (user && jwt) {
            dispatch('LOGIN', user);
            localStorage.setItem('jwt', jwt);
            history.push('/');
          }
        }}
      >
        {({ isSubmitting, values: { username, password } }) => {
          return (
            <Form>
              {!!errMsg && <small className='topError'>{errMsg}</small>}
              <InputField label='Username' name='username' />
              <InputField type='password' label='Password' name='password' />
              <button
                type='submit'
                disabled={isSubmitting || !username || !password}
              >
                Login
              </button>
            </Form>
          );
        }}
      </Formik>
    </FormWrapper>
  );
};

export default LoginPage;
