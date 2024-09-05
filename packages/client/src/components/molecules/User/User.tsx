import React from 'react';

import { ArrowRightFromSquare, Pencil } from '@gravity-ui/icons';
import { Icon, Skeleton, User as UserComponent, UserLabel } from '@gravity-ui/uikit';

import { useNavigate } from 'react-router-dom';

import { Button } from 'src/components/atoms/Button';
import { Container } from 'src/components/atoms/Container';
import { authAPI } from 'src/hoc/AuthProvider';
import type { Nullable } from 'src/shared/types/global';
import type { TUser } from 'src/shared/types/user';

import { BASE_API_URL, PAGE_ROUTES, RESOURCE_URL } from 'src/utils/constants';
import Helpers from 'src/utils/helpers';

export type UserProps = {
  user: Nullable<TUser>;
  setUser?: (user: TUser) => void;
  userIsLoading?: boolean;
  isFullSize?: boolean;
};

export const User = ({ user, setUser, userIsLoading, isFullSize = false }: UserProps) => {
  const navigate = useNavigate();

  const errorHandler = (err: Error) => {
    Helpers.Log('ERROR', err);
  };

  const logoutHandler = () => {
    if (setUser) {
      setUser({} as TUser);
      localStorage.removeItem('isAuth');
    }
  };

  const onSignOut = () => {
    authAPI.logout(logoutHandler, errorHandler);
  };

  return (
    <Container alignItems='center'>
      {user && user?.id ? (
        userIsLoading ? (
          <Skeleton />
        ) : (
          <>
            {isFullSize ? (
              <UserComponent
                size={'xl'}
                avatar={{
                  imgUrl: user?.avatar && `${BASE_API_URL}/resources${user?.avatar}`,
                  text: user?.display_name || user?.first_name,
                }}
                name={user?.display_name || `${user?.first_name} ${user?.second_name}`}
                description={user?.email && user?.email}
              />
            ) : (
              <UserLabel
                size={'xl'}
                view={'clear'}
                avatar={user?.avatar ? `${RESOURCE_URL}${user?.avatar}` : undefined}
                onClick={() => navigate(PAGE_ROUTES.PROFILE)}>
                {user?.display_name || `${user?.first_name} ${user?.second_name}`}
              </UserLabel>
            )}
            <Container gap={0}>
              {isFullSize && (
                <Button
                  view='flat-secondary'
                  size='xl'
                  onClick={() => navigate(PAGE_ROUTES.PROFILE)}
                  qa={'edit-button'}>
                  <Icon data={Pencil} />
                </Button>
              )}
              <Button view='flat-danger' size='xl' onClick={onSignOut} qa={'sign-out-button'}>
                <Icon data={ArrowRightFromSquare} />
              </Button>
            </Container>
          </>
        )
      ) : (
        <Button view={'flat-action'} type='button' isNavigate navigateTo={PAGE_ROUTES.SIGN_IN}>
          Sign In
        </Button>
      )}
    </Container>
  );
};
