export default class BaseAPI {
  static host = 'https://ya-praktikum.tech/api/v2';

  post<TRequest>(url: string, data: TRequest): Promise<unknown> {
    return fetch(BaseAPI.host + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
  }

  get(url: string): Promise<unknown> {
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
