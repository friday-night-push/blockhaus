import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  ErrorPage404,
  GamePage,
  GamePausePage,
  GameResultPage,
  GameSetupPage,
  LeaderBoardPage,
  ProfilePage,
  RecoverPasswordPage,
  ResetPasswordPage,
  SignInPage,
  SignUpPage,
  ErrorBoundaryPage,
} from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignInPage />,
    errorElement: <ErrorPage404 />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
    errorElement: <ErrorPage404 />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
    errorElement: <ErrorPage404 />,
  },
  {
    path: '/recover-password',
    element: <RecoverPasswordPage />,
    errorElement: <ErrorPage404 />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    errorElement: <ErrorPage404 />,
  },
  {
    path: '/game-menu',
    element: <GameResultPage />,
    errorElement: <ErrorPage404 />,
  },
  {
    path: '/game',
    element: <GamePage />,
    errorElement: <ErrorPage404 />,
  },
  {
    path: '/game-pause',
    element: <GamePausePage />,
    errorElement: <ErrorPage404 />,
  },
  {
    path: '/game-result',
    element: <GameResultPage />,
    errorElement: <ErrorPage404 />,
  },
  {
    path: '/game-setup',
    element: <GameSetupPage />,
    errorElement: <ErrorPage404 />,
  },
  {
    path: '/leader-board',
    element: <LeaderBoardPage />,
    errorElement: <ErrorPage404 />,
  },
  {
    path: '/error-boundary',
    element: <ErrorBoundaryPage />,
    errorElement: <ErrorPage404 />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
