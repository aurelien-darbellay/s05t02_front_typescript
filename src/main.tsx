import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TypesConfigProvider } from './contexts/TypesConfigProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TypesConfigProvider>
      <Router>
        <App />
      </Router>
    </TypesConfigProvider>
  </StrictMode>
);
