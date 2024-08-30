import React from 'react';

import { Loader } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router-dom';

import { Page } from 'src/components/organisms/Page';
import { useAuth } from 'src/hooks/use-auth';
import { PAGE_ROUTES } from 'src/utils/constants';

interface ProtectedRouteProps {
  element: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { user, userIsLoading } = useAuth();

  const navigate = useNavigate();

  if (userIsLoading) {
    return (
      <Page>
        <Loader size={'l'} />
      </Page>
    );
  }

  if (!user || !user.id) {
    navigate(PAGE_ROUTES.SIGN_IN);
  }

  return element;
};
