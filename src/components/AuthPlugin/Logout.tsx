import { ApiPaths } from '../../apiPaths';
import axios from '../../axiosConfig';

const Logout = ({ authStateSetters, pluginCfg }) => {
  const {
    setIsAuthenticated,
    setIsVisible,
    setUsername,
    setPassword,
    setPassword2,
    setError,
  } = authStateSetters;
  const { right, left, top } = pluginCfg;
  const handleLogout = async () => {
    try {
      await axios.post(ApiPaths.LOGOUT_PATH); // Adjust endpoint as needed
      setIsAuthenticated(false);
      setIsVisible(false);
      setUsername('');
      setPassword('');
      setPassword2('');
      setError(null);
      sessionStorage.removeItem('actingUser');
      localStorage.removeItem('username');
      window.location.href = '/'; // Redirect after logout
    } catch (err) {
      //console.error("Logout failed", err);
      setError('Logout failed. Try again.');
    }
  };
  return (
    <div
      style={{
        top: top ? `${top}px` : 'auto',
        right: right ? `${right}px` : 'auto',
        left: left ? `${left}px` : 'auto',
        zIndex: 10,
      }}
      className="fixed flex flex-col items-center justify-center"
    >
      <span
        className="bg-purple-cool cursor-pointer font-poppins shadow-lg px-4 py-2 rounded-lg text-white hover:bg-pink-cool"
        onClick={handleLogout}
      >
        Logout
      </span>
    </div>
  );
};

export default Logout;
