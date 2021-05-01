import { API_URL } from '../config';

type LoginData = {
  username: string;
  password: string;
};

type RegisterData = LoginData & {
  fullName: string;
  email: string;
};

export const loginUser = async (loginData: LoginData) => {
  return await fetch(`${API_URL}/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  }).then((result) => result.json());
};

export const registerUser = async (registerData: RegisterData) => {
  return fetch(`${API_URL}/api/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerData),
  }).then((result) => result.json());
};
