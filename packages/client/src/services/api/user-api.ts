import type {
  TErrorFn,
  TFindUserRequest,
  TUser,
  TUserPasswordRequest,
  TUserProfileRequest,
} from 'src/shared/types/user';

import { getResponseOrThrow } from 'src/utils/get-response-or-throw';

import BaseAPI from './base-api';

export default class UserAPI extends BaseAPI {
  updateProfile(data: TUserProfileRequest, cb: (u: TUser) => void, errorCb: TErrorFn): Promise<unknown> {
    return this.put<TUserProfileRequest>('/user/profile', data)
      .then(async response => await (await getResponseOrThrow(response)).json())
      .then(cb)
      .catch(errorCb);
  }

  updateAvatar(data: FormData, cb: (u: TUser) => void, errorCb: TErrorFn): Promise<unknown> {
    return this.put<FormData>('/user/profile/avatar', data)
      .then(async response => await (await getResponseOrThrow(response)).json())
      .then(cb)
      .catch(errorCb);
  }

  changePassword(data: TUserPasswordRequest, cb: () => void, errorCb: TErrorFn): Promise<unknown> {
    return this.put<TUserPasswordRequest>('/user/password', data)
      .then(() => cb())
      .catch(errorCb);
  }

  searchUsers(data: TFindUserRequest, cb: (users: TUser[]) => void, errorCb: TErrorFn): Promise<unknown> {
    return this.post<TFindUserRequest>('/user/search', data)
      .then(async response => await (await getResponseOrThrow(response)).json())
      .then(cb)
      .catch(errorCb);
  }
}
