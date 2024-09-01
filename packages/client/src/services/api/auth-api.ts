import type {
  TErrorFn,
  TSignInRequest,
  TSignUpRequest,
  TUser,
} from 'src/shared/types/user';

import type { TYandex, TYandexAuth } from 'src/shared/types/yandex';

import { getResponseOrThrow } from 'src/utils/get-response-or-throw';

import BaseAPI from './base-api';

type TResp = (p: Response) => void;

export default class AuthAPI extends BaseAPI {
  signup(
    data: TSignUpRequest,
    cb: (u: TUser) => void,
    errorCb: TErrorFn
  ): Promise<unknown> {
    return this.post<TSignUpRequest>('/auth/signup', data)
      .then(async response => await (await getResponseOrThrow(response)).json())
      .then(cb)
      .catch(errorCb);
  }

  signin(data: TSignInRequest, cb: TResp, errorCb: TErrorFn): Promise<unknown> {
    return this.post<TSignInRequest>('/auth/signin', data) //, 'same-origin')
      .then(response => getResponseOrThrow(response))
      .then(cb)
      .catch(errorCb);
  }

  getuser(cb: (u: TUser) => void, errorCb: TErrorFn): Promise<unknown> {
    return this.get('/auth/user')
      .then(async response => await (await getResponseOrThrow(response)).json())
      .then(cb)
      .catch(errorCb);
  }

  logout(cb: () => void, errorCb: TErrorFn): Promise<unknown> {
    return this.post<unknown>('/auth/logout', {}).then(cb).catch(errorCb);
  }

  yaGetServiceId(cb: (d: TYandex) => void, errorCb: TErrorFn) {
    return this.get(
      '/oauth/yandex/service-id?redirect_uri=http://localhost:3000'
    )
      .then(async response => await (await getResponseOrThrow(response)).json())
      .then(cb)
      .catch(errorCb);
  }

  yaSignInUp(
    data: TYandexAuth,
    cb: TResp,
    errorCb: TErrorFn
  ): Promise<unknown> {
    return this.post<TYandexAuth>('/oauth/yandex', data) //, 'same-origin')
      .then(response => getResponseOrThrow(response))
      .then(cb)
      .catch(errorCb);
  }
}
