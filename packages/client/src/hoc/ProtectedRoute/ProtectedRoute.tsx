import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from 'src/hoc/AuthProvider';

import { PAGE_ROUTES } from '../../utils/constants';

interface ProtectedRouteProps {
  element: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { user, userIsLoading } = useAuth();

  const navigate = useNavigate();

  if (userIsLoading) {
    return <div>Loading...</div>;
  }

  if (!user || !user.id) {
    navigate(PAGE_ROUTES.SIGN_IN);
  }

  return element;
};
