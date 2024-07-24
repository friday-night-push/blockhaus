import { TSignUpRequest, TSignInRequest, TUser } from '../../shared/types/user';
import BaseAPI from './base-api';

type TErrorFn = (e: unknown) => void;

export default class AuthAPI extends BaseAPI {
  signup(
    data: TSignUpRequest,
    cb: (u: TUser) => void,
    errorCb: TErrorFn
  ): Promise<unknown> {
    return this.post<TSignUpRequest>('/auth/signup', data)
      .then((response: any) => response.json())
      .then(cb)
      .catch(errorCb);
  }

  signin(
    data: TSignInRequest,
    cb: () => void,
    errorCb: TErrorFn
  ): Promise<unknown> {
    return this.post<TSignInRequest>('/auth/signin', data)
      .then(cb)
      .catch(errorCb);
  }

  getuser(cb: (u: TUser) => void, errorCb: TErrorFn): Promise<unknown> {
    return this.get('/auth/user')
      .then((response: any) => response.json())
      .then(cb)
      .catch(errorCb);
  }

  logout(cb: () => void, errorCb: TErrorFn): Promise<unknown> {
    return this.post<unknown>('/auth/logout', {}).then(cb).catch(errorCb);
  }
}
