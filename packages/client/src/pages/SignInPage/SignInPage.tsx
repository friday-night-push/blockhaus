import React, { useContext, useState } from 'react';

import { LogoYandex } from '@gravity-ui/icons';
import { Icon, Text } from '@gravity-ui/uikit';
import { Navigate } from 'react-router-dom';

import { Button } from 'src/components/atoms/Button';
import { Container } from 'src/components/atoms/Container';
import { Logo } from 'src/components/atoms/Logo';
import { BackButton } from 'src/components/molecules/BackButton/BackButton';
import { Form } from 'src/components/molecules/Form';
import { Page } from 'src/components/organisms/Page';
import { authAPI, AuthContext } from 'src/hoc/AuthProvider';
import type { TSignInRequest, TUser } from 'src/shared/types/user';
import type { TYandex } from 'src/shared/types/yandex';

import { PAGE_ROUTES } from 'src/utils/constants';
import Helpers from 'src/utils/helpers';

import { inputs } from './SignInPage.constants';

export const SignInPage: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);
  const [error, setError] = useState<string | undefined>(undefined);

  const auth = async (formData: TSignInRequest) => {
    await authAPI.signIn(formData, isOk, errorHandler);
  };

  const isOk = (response: Response) => {
    if (response.ok) {
      localStorage.setItem('isAuth', 'true');
      authAPI.getUser(updUserData, errorHandler);
    }
  };

  const updUserData = (user: TUser) => {
    if (setUser) {
      setUser(user);
    }
  };

  const errorHandler = (err: Error) => {
    setError(String(err));
    Helpers.Log('ERROR', err);
  };

  const isGetIdOk = (data: TYandex) => {
    const url = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${data.service_id}&redirect_uri=http://localhost:3000`;
    window.location.href = url;
  };

  const goToYandex = async () => {
    await authAPI.yaGetServiceId(isGetIdOk, errorHandler);
  };

  return (
    <Page>
      {!user?.id ? (
        <>
          <Logo size='sm' />
          <Container direction='column' alignItems='center'>
            <Text variant='display-2'>Sign in</Text>
            <Text variant='subheader-2' style={{ textAlign: 'center' }}>
              Back again? Just sign in to keep your results showing up on the leaderboards
            </Text>
            <Form inputs={inputs} onSubmit={auth} errorMessage={error} />
            <Button view='outlined-action' onClick={goToYandex}>
              <Icon data={LogoYandex} />
              Auth with Yandex
            </Button>
            <Button view='flat' isNavigate navigateTo={PAGE_ROUTES.SIGN_UP}>
              First time here? Sign up
            </Button>
            <BackButton fallbackRoute={PAGE_ROUTES.MENU} />
          </Container>
        </>
      ) : (
        <Navigate to={PAGE_ROUTES.MENU} />
      )}
    </Page>
  );
};
