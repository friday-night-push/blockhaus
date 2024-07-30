import { useState } from 'react';

import { Col, Container, Flex, Link, Text } from '@gravity-ui/uikit';

import { Logo } from 'src/components/atoms';
import { Form } from 'src/components/molecules';
import AuthAPI from 'src/services/api/auth-api';
import { TSignInRequest, TUser } from 'src/shared/types/user';
import Helpers from 'src/utils/helpers';

import {
  inputs,
  USER_DATA_MOCK,
  validationSchema,
} from './SignInPage.constants';

const authAPI = new AuthAPI();

export const SignInPage = () => {
  const [user, setUser] = useState<TUser>({} as TUser);
  const [data, setData] = useState<TSignInRequest>({} as TSignInRequest);

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

  return (
    <Col>
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
        <Text variant={'body-2'}>
          First time here? <Link href={'/sign-up'}>Sign up</Link>
        </Text>
      </Flex>
    </Col>
  );
};
