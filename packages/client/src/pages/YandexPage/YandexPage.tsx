import { useState } from 'react';

import { Button } from '@gravity-ui/uikit';

//import { useNavigate } from 'react-router-dom';

import { Page } from 'src/components/organisms/Page';

import AuthAPI from 'src/services/api/auth-api';

import type { TYandex, TYandexAuth } from 'src/shared/types/yandex';

import Helpers from 'src/utils/helpers';

const authAPI = new AuthAPI();

export const YandexPage = () => {
  //const navigate = useNavigate();

  const getServiceId = async () => {
    console.info('getServiceId');
    await authAPI.yaGetServiceId(isGetIdOk, errorHandler);
    //navigate('//ya-praktikum.tech/api/v2/oauth/yandex/service-id?redirect_uri=http://localhost:3000/yandex');
  };

  const auth = async (data: TYandexAuth) => {
    console.info('auth');
    await authAPI.yaSignInUp(data, isAuthOk, errorHandler);
  };

  const isGetIdOk = (data: TYandex) => {
    const yaAuthData: TYandexAuth = {
      code: data.service_id,
      redirect_uri: 'http://localhost:3000',
    };
    console.info('yaAuthData', yaAuthData);
    auth(yaAuthData);
  };

  const isAuthOk = (r: Response) => {
    console.info(r);
  };

  const errorHandler = (err: unknown) => {
    Helpers.Log('ERROR', err);
  };

  return (
    <Page>
      <h1>Yandex</h1>
      <Button onClick={getServiceId}>жмяк</Button>
    </Page>
  );
};
