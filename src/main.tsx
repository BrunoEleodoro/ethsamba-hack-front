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
import ReceiverComponent from './components/ReceiverComponent';
import ReceiverValueComponent from './components/ReceiverValueComponent';
import ReceiverReviewComponent from './components/ReceiverReviewComponent';
import SuccessComponent from './components/SuccessComponent';

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
    path: 'company/1',
    element: <ReceiverComponent />,
  },
  {
    path: 'company/2',
    element: <ReceiverValueComponent />,
  },
  {
    path: 'success',
    element: <SuccessComponent />,
  },
  {
    path: 'company/3',
    element: <ReceiverReviewComponent />,
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
