import { useState } from 'react';
import { createHandleAuth } from './handleAuth';

const LoginRegister = ({ authStateSetters, authState, pluginCfg }) => {
  const {
    setIsAuthenticated,
    setIsVisible,
    setUsername,
    setPassword,
    setPassword2,
    setError,
    setIsRegister,
  } = authStateSetters;
  const { right, left, top } = pluginCfg;
  const { isVisible, username, password, password2, isRegister, error } =
    authState;

  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = createHandleAuth({
    username,
    password,
    password2,
    isRegister,
    setError,
    setIsAuthenticated,
  });

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
      {!isVisible ? (
        <span
          className="bg-pink-cool cursor-pointer font-poppins uppercase shadow-lg px-4 py-2 rounded-lg hover:bg-purple-cool hover:text-white"
          onClick={() => setIsVisible(true)}
        >
          Login / Register
        </span>
      ) : (
        <div className="relative p-6 bg-white shadow-lg font-poppins rounded-lg w-96">
          <button
            className="absolute top-4 right-4 text-pink-cool font-special text-2xl hover:text-purple-cool cursor-pointer"
            onClick={() => setIsVisible(false)}
          >
            ✖
          </button>
          <h2 className="text-2xl font-semibold font-special uppercase text-center">
            {isRegister ? 'Register' : 'Login'}
          </h2>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setIsLoading(true);
              try {
                await handleAuth(e);
              } finally {
                setIsLoading(false);
              }
            }}
            className="flex flex-col gap-4 mt-4 mb-4"
          >
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 border rounded-lg w-full"
              disabled={isLoading}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border rounded-lg w-full"
              disabled={isLoading}
            />
            {isRegister && (
              <input
                type="password"
                placeholder="Repeat Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="p-2 border rounded-lg w-full"
                disabled={isLoading}
              />
            )}
            <button
              type="submit"
              disabled={isLoading}
              className={`cursor-pointer bg-pink-cool text-center pl-4 pr-4 pt-2 pb-2 rounded-lg hover:bg-purple-cool hover:text-white flex items-center justify-center ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <span className="dot-flashing"></span>
              ) : isRegister ? (
                'Register'
              ) : (
                'Login'
              )}
            </button>
          </form>
          <div
            onClick={() => setIsRegister(!isRegister)}
            className="cursor-pointer mt-4 uppercase text-purple-cool w-full text-center pointer hover:shadow-sm active:shadow-none"
          >
            {isRegister ? 'Back to Login' : 'Register'}
          </div>
        </div>
      )}
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

export default LoginRegister;
