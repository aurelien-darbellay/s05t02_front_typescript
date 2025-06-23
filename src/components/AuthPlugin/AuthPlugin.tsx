import { useEffect, useState } from "react";
import axios from "../../axiosConfig"; // Make sure this is the custom config
import Logout from "./Logout";
import LoginRegister from "./LoginRegister";
import { ApiPaths } from "../../apiPaths";

const AuthPlugin = ({ right, left, top }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState<string | null>(null);
  const authStateSetters ={ setIsVisible, setIsAuthenticated, setUsername, setPassword, setPassword2, setError,setIsRegister };
  const authState = {
    isVisible,
    isRegister,
    isAuthenticated,
    username,
    password,
    password2,
    error,
  };

  // On mount, try to check if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(ApiPaths.AUTHENTICATION_CHECK_PATH);
        if (res.status === 200) {
          //console.log("User is authenticated");
          setIsAuthenticated(true);
        }
        else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);


  if (isAuthenticated) {
    return <Logout authStateSetters={authStateSetters} pluginCfg={{ right, left, top }} />;
  }

  // --- Unauthenticated state (login/register)
  return (
    <LoginRegister authStateSetters={authStateSetters} authState={authState} pluginCfg={{ right, left, top }} />
  );
};

export default AuthPlugin;
