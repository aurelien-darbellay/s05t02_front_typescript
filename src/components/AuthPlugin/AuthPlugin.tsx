import { useEffect, useState } from 'react';
import axios from '../../axiosConfig';
import Logout from './Logout';
import LoginRegister from './LoginRegister';
import { ApiPaths } from '../../apiPaths';
import { useLocation } from 'react-router-dom';

type AuthPluginProps = {
  right?: string | number;
  left?: string | number;
  top?: string | number;
};

const AuthPlugin: React.FC<AuthPluginProps> = ({ right, left, top }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState<string | null>(null);

  const authStateSetters = {
    setIsVisible,
    setIsAuthenticated,
    setUsername,
    setPassword,
    setPassword2,
    setError,
    setIsRegister,
  };

  const authState = {
    isVisible,
    isRegister,
    isAuthenticated,
    username,
    password,
    password2,
    error,
  };

  const location = useLocation();
  const hideAuthPlugin = location.pathname.startsWith('/public/');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(ApiPaths.AUTHENTICATION_CHECK_PATH);
        setIsAuthenticated(res.status === 200);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (hideAuthPlugin) return null;

  return isAuthenticated ? (
    <Logout
      authStateSetters={authStateSetters}
      pluginCfg={{ right, left, top }}
    />
  ) : (
    <LoginRegister
      authStateSetters={authStateSetters}
      authState={authState}
      pluginCfg={{ right, left, top }}
    />
  );
};

export default AuthPlugin;
