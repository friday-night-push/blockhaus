import { useState } from 'react';

import { Flex, Link, Text } from '@gravity-ui/uikit';

import { useNavigate } from 'react-router-dom';

import { Button, Container, Logo } from 'src/components/atoms';
import { Form } from 'src/components/molecules';
import AuthAPI from 'src/services/api/auth-api';
import { TSignUpRequest, TUser } from 'src/shared/types/user';
import Helpers from 'src/utils/helpers';

import { inputs, validationSchema } from './SignUpPage.constants';

const authAPI = new AuthAPI();

export const SignUpPage = () => {
  const [user, setUser] = useState<TUser>({} as TUser);
  const [data, setData] = useState<TSignUpRequest>({} as TSignUpRequest);

  const navigate = useNavigate();

  const signup = async (data: TSignUpRequest) => {
    authAPI.signup(data, updUserData, errorHandler);
  };

  const updUserData = (u: TUser) => {
    setUser(u);
  };

  const errorHandler = (err: unknown) => {
    Helpers.Log('ERROR', err);
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
          onSubmit={signup}
        />
        <Text variant={'body-2'}>
          Signed up already? <Link href={'/sign-in'}>Sign In</Link>
        </Text>
        <Button onClick={goToMenu}>Back to Menu</Button>
      </Flex>
    </Container>
  );
};
