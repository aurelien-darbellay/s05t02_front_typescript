import { ApiPaths } from '../../apiPaths';
import axios from '../../axiosConfig';
import { FormEventHandler } from 'react';

interface AuthHandlerParams {
  username: string;
  password: string;
  password2?: string;
  isRegister: boolean;
  setIsAuthenticated: (value: boolean) => void;
  setError: (msg: string | null) => void;
}

export const createHandleAuth = ({
  username,
  password,
  password2,
  isRegister,
  setError,
  setIsAuthenticated,
}: AuthHandlerParams): FormEventHandler<HTMLFormElement> => {
  return async (e) => {
    e.preventDefault();
    setError(null);

    function determineBody() {
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);
      return isRegister ? { username, password } : params;
    }

    function validateSubmission() {
      if (!username || !password) {
        setError('All fields are required');
        return false;
      }
      if (isRegister && !password2) {
        setError('Please repeat your password');
        return false;
      }
      if (isRegister && password !== password2) {
        setError('Passwords do not match');
        return false;
      }
      return true;
    }

    if (!validateSubmission()) return;

    const url = isRegister ? ApiPaths.REGISTER_PATH : ApiPaths.LOGIN_PATH;
    const body = determineBody();
    const contentType = isRegister
      ? 'application/json'
      : 'application/x-www-form-urlencoded';
    const options = { headers: { 'Content-Type': contentType } };

    try {
      const response = await axios.post(url, body, options);
      //console.log(response.data);
      if (response.status === 200) {
        setIsAuthenticated(true);
        localStorage.setItem('username', username);
        if (response.data?.authorities?.includes('ROLE_ADMIN')) {
          window.location.href = '/admin';
        } else {
          window.location.href = '/user';
        }
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        setError('Bad Credentials');
      } else {
        const errorMessage =
          error.response?.data?.message || error.message || 'Unknown error';
        setError('Something went wrong: ' + errorMessage);
      }
    }
  };
};
