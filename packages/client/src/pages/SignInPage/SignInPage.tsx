import { useState } from 'react';

import { Flex, Link, Text } from '@gravity-ui/uikit';

import { useNavigate } from 'react-router-dom';

import { Button, Container, Logo } from 'src/components/atoms';
import { Form } from 'src/components/molecules';
import AuthAPI from 'src/services/api/auth-api';
import { TSignInRequest, TUser } from 'src/shared/types/user';
import Helpers from 'src/utils/helpers';

import {
  inputs,
  USER_DATA_MOCK,
  validationSchema,
} from './SignInPage.constants';

export const authAPI = new AuthAPI();

export const SignInPage = () => {
  const [user, setUser] = useState<TUser>({} as TUser);
  const [data, setData] = useState<TSignInRequest>({} as TSignInRequest);

  const navigate = useNavigate();

  const auth = () => {
    const _data: TSignInRequest = USER_DATA_MOCK;

    setData(_data);

    authAPI.signin(_data, isOk, errorHandler);
  };

  const isOk = () => {
    authAPI.getuser(updUserData, errorHandler);
  };

  const updUserData = (u: TUser) => {
    setUser(u);
  };

  const errorHandler = (err: unknown) => {
    Helpers.Log('ERROR', err);
  };

  const goToSignUp = () => {
    navigate('/sign-up');
  };

  const goToMenu = () => {
    navigate('/');
  };

  return (
    <Container
      minHeight={'100vh'}
      direction={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      gap={8}>
      <Flex
        minHeight={'100vh'}
        width={'100%'}
        maxWidth={'340px'}
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={4}>
        <Logo size="small" />
        <Form
          initialValues={data}
          inputs={inputs}
          validationSchema={validationSchema}
          onSubmit={auth}
        />
        <Button view={'flat'} onClick={goToSignUp}>
          First time here? Sign up
        </Button>
        <Button view={'flat'} onClick={goToMenu}>
          Back to Menu
        </Button>
      </Flex>
    </Container>
  );
};
