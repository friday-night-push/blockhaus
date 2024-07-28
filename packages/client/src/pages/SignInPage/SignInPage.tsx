import { useState } from 'react';
import { Link } from 'react-router-dom';

import { TSignInRequest, TUser } from 'src/shared/types/user';
import AuthAPI from 'src/services/api/auth-api';
import Helpers from 'src/utils/helpers';

const authAPI = new AuthAPI();

export const SignInPage = () => {
  const [user, setUser] = useState<TUser>({} as TUser);
  const [data, setData] = useState<TSignInRequest>({} as TSignInRequest);

  const login = 'l586';
  const password = '123!!321';

  const auth = () => {
    const _data: TSignInRequest = {
      login,
      password,
    };

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
    <>
      <div>SignInPage</div>
      <hr />
      <div>Login: {login}</div>
      <div>Password: {password}</div>
      <button onClick={auth}>Sign in</button> - login with those user
      credentials
      <div>
        <p>&nbsp;</p>
        <Link to="/signup">Register</Link> - registering user with those random
        user credentials
      </div>
      <hr />
      <div>
        <strong>Send login data</strong>
      </div>
      <pre>{JSON.stringify(data, null, '    ')}</pre>
      <hr />
      <div>
        <strong>Login user data</strong>
      </div>
      <pre>{JSON.stringify(user, null, '    ')}</pre>
      <div>
        <Link to="/error-boundary">Error boundary page</Link> - demonstration of
        error boundary behavior
      </div>
    </>
  );
};
