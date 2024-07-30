import { createBrowserRouter, RouteObject } from 'react-router-dom';

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
  ForumPage,
  topicsLoader,
  ForumTopicPage,
  topicInfo,
  GameMenuPage,
} from './pages';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <GameMenuPage />,
    errorElement: <ErrorPage404 />,
  },
  {
    path: '/sign-in',
    element: <SignInPage />,
    errorElement: <ErrorPage404 />,
  },
  {
    path: '/sign-up',
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
  {
    path: '/forum',
    element: <ForumPage />,
    errorElement: <ErrorPage404 />,
    loader: topicsLoader,
  },
  {
    path: 'forum/:topicId/:page?',
    element: <ForumTopicPage />,
    errorElement: <ErrorPage404 />,
    loader: topicInfo,
  },
];

const router = createBrowserRouter(routes);

export { routes, router };
