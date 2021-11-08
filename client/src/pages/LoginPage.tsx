import axios from 'axios';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import FormWrapper from '../components/FormWrapper';
import InputField from '../components/InputField';
import { useAuthDispatch } from '../context/AuthContext';
import { loginUser } from '../services/users';
import getAxiosError from '../utils/getAxiosError';
import './LoginPage.css';

const LoginPage = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, error } = useMutation(loginUser);
  const [errMsg, setErrMsg] = useState('');
  const dispatch = useAuthDispatch();
  const history = useHistory();

  useEffect(() => {
    if (error) setErrMsg(getAxiosError(error).message);
  }, [error]);

  return (
    <FormWrapper title='Login'>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, _action) => {
          setErrMsg('');
          const res = await mutateAsync(values);
          const { user, jwt } = res;

          if (user && jwt) {
            dispatch('LOGIN', user);
            localStorage.setItem('jwt', jwt);
            axios.defaults.headers = {
              'Content-Type': 'application/json',
              authorization: `Bearer ${jwt}`,
            };
            await queryClient.invalidateQueries('me');
            history.push('/');
          }
        }}
      >
        {({ isSubmitting, values: { username, password } }) => {
          return (
            <Form>
              {!!errMsg && (
                <small className='topError'>
                  {errMsg}
                  <button onClick={() => setErrMsg('')}>
                    <i className='fas fa-times'></i>
                  </button>
                </small>
              )}
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
