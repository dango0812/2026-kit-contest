import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ToastProvider } from '@/providers/ToastProvider';

import App from './App';

import '@shared/styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <App />
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
);
