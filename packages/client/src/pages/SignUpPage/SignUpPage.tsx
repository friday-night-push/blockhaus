import React, { useContext, useState } from 'react';

import { Text } from '@gravity-ui/uikit';
import { Navigate } from 'react-router-dom';

import { Button } from 'src/components/atoms/Button';
import { Container } from 'src/components/atoms/Container';
import { Logo } from 'src/components/atoms/Logo';
import { Form } from 'src/components/molecules/Form';
import { Page } from 'src/components/organisms/Page';
import { AuthContext } from 'src/hoc/AuthProvider';
import AuthAPI from 'src/services/api/auth-api';
import type { TSignUpRequest, TUser } from 'src/shared/types/user';
import { signUpValidationSchema } from 'src/shared/validation/user';
import { PAGE_ROUTES } from 'src/utils/constants';
import Helpers from 'src/utils/helpers';

import { inputs } from './SignUpPage.constants';

const authAPI = new AuthAPI();

export const SignUpPage = () => {
  const { user, setUser, userIsLoading } = useContext(AuthContext);
  const [error, setError] = useState<string | undefined>(undefined);

  const signup = async (data: TSignUpRequest) => {
    await authAPI.signup(data, updUserData, errorHandler);
  };

  const updUserData = (u: TUser) => {
    if (setUser) {
      setUser(u);
    }
  };

  const errorHandler = (err: Error) => {
    setError(String(err));
    Helpers.Log('ERROR', err);
  };

  return (
    <Page>
      {!user?.id && !userIsLoading ? (
        <>
          <Logo size='sm' />
          <Container direction='column' alignItems='center'>
            <Text variant='display-2'>Sign up</Text>
            <Text variant='subheader-2' style={{ textAlign: 'center' }}>
              New here? Dive in! Just fill in the form and let the good times
              roll.
            </Text>
            <Form
              inputs={inputs}
              validationSchema={signUpValidationSchema}
              onSubmit={signup}
              errorMessage={error}
            />
            <Button view={'flat'} isNavigate navigateTo={PAGE_ROUTES.SIGN_IN}>
              Signed up already? Sign In
            </Button>
            <Button view='flat' isNavigate navigateTo={-1}>
              Back
            </Button>
          </Container>
        </>
      ) : (
        <Navigate to={PAGE_ROUTES.MENU} />
      )}
    </Page>
  );
};
