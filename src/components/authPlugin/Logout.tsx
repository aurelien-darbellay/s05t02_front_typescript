import { useState } from 'react';
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

  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await axios.post(ApiPaths.LOGOUT_PATH);
      setIsAuthenticated(false);
      setIsVisible(false);
      setUsername('');
      setPassword('');
      setPassword2('');
      setError(null);
      sessionStorage.removeItem('actingUser');
      localStorage.removeItem('username');
      window.location.href = '/';
    } catch {
      setError('Logout failed. Try again.');
    } finally {
      setIsLoading(false);
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
      <button
        disabled={isLoading}
        onClick={handleLogout}
        className={`bg-purple-cool text-white cursor-pointer font-poppins shadow-lg px-4 py-2 rounded-lg hover:bg-pink-cool flex items-center justify-center ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? <span className="dot-flashing"></span> : 'Logout'}
      </button>

      <style>{`
        .dot-flashing {
          position: relative;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background-color: white;
          animation: dotFlashing 1s infinite linear alternate;
        }
        @keyframes dotFlashing {
          0% {
            background-color: white;
          }
          50%,
          100% {
            background-color: rgba(255, 255, 255, 0.3);
          }
        }
      `}</style>
    </div>
  );
};

export default Logout;
