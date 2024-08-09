import { BASE_API_URL } from 'src/utils/constants';

export default class BaseAPI {
  static host = BASE_API_URL;

  post<TRequest>(url: string, data: TRequest, credentials = 'include') {
    return fetch(BaseAPI.host + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: credentials == 'include' ? 'include' : 'same-origin',
      body: JSON.stringify(data),
    });
  }

  get(url: string) {
    return fetch(BaseAPI.host + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: 'include',
    });
  }

  put() {
    throw new Error('Not implemented');
  }

  delete() {
    throw new Error('Not implemented');
  }
}
