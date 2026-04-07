import { lazy, Suspense } from 'react';

import { ROUTES } from '@constants/routes';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('@pages/home/page'));
const NotFoundPage = lazy(() => import('@pages/404/page'));

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          element={
            <div>
              Layout
              <Outlet />
            </div>
          }
        >
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
