import axios from 'axios';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import FormWrapper from '../components/FormWrapper';
import InputField from '../components/InputField';
import { loginUser } from '../services/users';
import getAxiosError from '../utils/getAxiosError';
import './LoginPage.css';

const LoginPage = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(loginUser);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  return (
    <FormWrapper title='Login'>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, _action) => {
          setErrMsg('');
          mutateAsync(values, {
            onSuccess: async (data) => {
              const { user, jwt } = data;

              if (user && jwt) {
                localStorage.setItem('jwt', jwt);
                axios.defaults.headers = {
                  'Content-Type': 'application/json',
                  authorization: `Bearer ${jwt}`,
                };
                await queryClient.invalidateQueries('me');
                navigate('/');
              }
            },
            onError: (error) => setErrMsg(getAxiosError(error).message),
          });
        }}
      >
        {({ isSubmitting, values: { username, password }, setFieldValue }) => {
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
              <div className='btn-group'>
                <button
                  type='submit'
                  disabled={isSubmitting || !username || !password}
                >
                  Login
                </button>
                <button
                  type='button'
                  onClick={() => {
                    setFieldValue('username', 'bob');
                    setFieldValue('password', 'bob123');
                  }}
                >
                  Load test credentials
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <small>
        Don't have an account? <Link to='/register'>Sign up</Link>
      </small>
    </FormWrapper>
  );
};

export default LoginPage;
