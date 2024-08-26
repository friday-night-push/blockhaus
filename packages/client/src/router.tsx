import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from 'src/hoc/ProtectedRoute';

import { ErrorBoundaryPage } from 'src/pages/ErrorBoundaryPage';
import { ErrorPage } from 'src/pages/ErrorPage';
import { ForumPage, topicsLoader } from 'src/pages/ForumPage';
import { ForumTopicPage, topicInfo } from 'src/pages/ForumTopicPage';
import { GameMenuPage } from 'src/pages/GameMenuPage';
import { GamePage } from 'src/pages/GamePage';
import { GamePausePage } from 'src/pages/GamePausePage';
import { GameResultPage } from 'src/pages/GameResultPage';
import { GameSetupPage } from 'src/pages/GameSetupPage';
import { LeaderBoardPage } from 'src/pages/LeaderBoardPage';
import { ProfilePage } from 'src/pages/ProfilePage';
import { RecoverPasswordPage } from 'src/pages/RecoverPasswordPage';
import { ResetPasswordPage } from 'src/pages/ResetPasswordPage';
import { SignInPage } from 'src/pages/SignInPage';
import { SignUpPage } from 'src/pages/SignUpPage';

import { PAGE_ROUTES } from './utils/constants';

const routes: RouteObject[] = [
  {
    path: PAGE_ROUTES.MENU,
    element: <GameMenuPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PAGE_ROUTES.SIGN_IN,
    element: <SignInPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PAGE_ROUTES.SIGN_UP,
    element: <SignUpPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PAGE_ROUTES.RESET_PAGE,
    element: <ResetPasswordPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PAGE_ROUTES.RECOVER_PASSWORD,
    element: <RecoverPasswordPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PAGE_ROUTES.PROFILE,
    element: <ProtectedRoute element={<ProfilePage />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: PAGE_ROUTES.GAME,
    element: <GamePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PAGE_ROUTES.GAME_PAUSE,
    element: <GamePausePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PAGE_ROUTES.GAME_RESULT,
    element: <GameResultPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PAGE_ROUTES.GAME_SETUP,
    element: <GameSetupPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PAGE_ROUTES.LEADER_BOARD,
    element: <LeaderBoardPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PAGE_ROUTES.ERROR_BOUNDARY,
    element: <ErrorBoundaryPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PAGE_ROUTES.FORUM,
    element: <ProtectedRoute element={<ForumPage />} />,
    errorElement: <ErrorPage />,
    loader: topicsLoader,
  },
  {
    path: PAGE_ROUTES.FORUM_TOPIC,
    element: <ProtectedRoute element={<ForumTopicPage />} />,
    errorElement: <ErrorPage />,
    loader: topicInfo,
  },
];

const router = createBrowserRouter(routes);

export { routes, router };
