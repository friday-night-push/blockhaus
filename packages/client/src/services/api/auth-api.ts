import type {
  TErrorFn,
  TSignInRequest,
  TSignUpRequest,
  TUser,
} from 'src/shared/types/user';

import { getResponseOrThrow } from 'src/utils/get-response-or-throw';

import BaseAPI from './base-api';

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

  signin(
    data: TSignInRequest,
    cb: (p: Response) => void,
    errorCb: TErrorFn
  ): Promise<unknown> {
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
}
