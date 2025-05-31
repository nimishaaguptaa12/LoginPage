import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import { FormPage } from './components/Form';
import ResultsPage from './components/ResultsPage';

// Define your routes
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <FormPage />,
    },
    {
      path: '/results',
      element: <ResultsPage />,
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true, // ✅ This prevents the future warning
    },
  }
);

function App() {
  return (
    <FormProvider>
      <div className="app-container">
        <header className="app-header"></header>

        <main className="app-main">
          <div className="bg-[url(/img/mountains.jpg)] ...">
            <div className="backdrop-blur-xs backdrop-grayscale ..."></div>
          </div>

          <RouterProvider router={router} />
        </main>
      </div>
    </FormProvider>
  );
}

export default App;