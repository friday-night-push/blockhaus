import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { ProtectedRoute } from './hoc';
import {
  ErrorBoundaryPage,
  ErrorPage,
  ForumPage,
  ForumTopicPage,
  GameMenuPage,
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
  topicInfo,
  topicsLoader,
} from './pages';
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
    element: <ForumPage />,
    errorElement: <ErrorPage />,
    loader: topicsLoader,
  },
  {
    path: PAGE_ROUTES.FORUM_TOPIC,
    element: <ForumTopicPage />,
    errorElement: <ErrorPage />,
    loader: topicInfo,
  },
];

const router = createBrowserRouter(routes);

export { routes, router };
