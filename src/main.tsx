import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';
import CompanyScreen from './pages/CompanyScreen';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'company',
    element: <CompanyScreen />,
  },
  {
    path: 'about',
    element: <div>About</div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
