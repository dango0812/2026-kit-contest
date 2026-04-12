import { lazy, StrictMode } from 'react';

import { ROUTES } from '@constants/routes';
import { ToastProvider } from '@providers/ToastProvider';
import { RootLayout } from '@shared/layout/RootLayout';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import '@shared/styles/global.css';

const HomePage = lazy(() => import('@pages/home/page'));
const NotFoundPage = lazy(() => import('@pages/404/page'));

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </StrictMode>,
  );
}
