import React, { useContext, useState } from 'react';

import { Text } from '@gravity-ui/uikit';
import { Navigate, useNavigate } from 'react-router-dom';

import { Button, Container, Form, Logo, Page } from 'src/components';
import { AuthContext } from 'src/hoc';
import AuthAPI from 'src/services/api/auth-api';
import { TSignInRequest, TUser } from 'src/shared/types/user';
import { PAGE_ROUTES } from 'src/utils/constants';
import Helpers from 'src/utils/helpers';

import { inputs, validationSchema } from './SignInPage.constants';

export const authAPI = new AuthAPI();

export const SignInPage: React.FC = () => {
  const { user, setUser, userIsLoading } = useContext(AuthContext);
  const [error, setError] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const auth = async (formData: TSignInRequest) => {
    await authAPI.signin(formData, isOk, errorHandler);
  };

  const isOk = () => {
    authAPI.getuser(updUserData, errorHandler);
  };

  const updUserData = (user: TUser) => {
    if (setUser) {
      setUser(user);
    }
  };

  const errorHandler = (err: unknown) => {
    setError(String(err));
    Helpers.Log('ERROR', err);
  };

  const goToSignUp = () => {
    navigate(PAGE_ROUTES.SIGN_UP);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Page>
      {!user?.id && !userIsLoading ? (
        <>
          <Logo size="sm" />
          <Container direction="column" alignItems="center">
            <Text variant="display-2">Sign in</Text>
            <Text variant="subheader-2" style={{ textAlign: 'center' }}>
              Back again? Just sign in to keep your results showing up on the
              leaderboards
            </Text>
          </Container>
          <Form
            inputs={inputs}
            validationSchema={validationSchema}
            onSubmit={auth}
            errorMessage={error}
          />
          <Button view="flat" onClick={goToSignUp}>
            First time here? Sign up
          </Button>
          <Button view="flat" onClick={goBack}>
            Back
          </Button>
        </>
      ) : (
        <Navigate to={PAGE_ROUTES.MENU} />
      )}
    </Page>
  );
};
