import { useState } from 'react';
import { TSignInRequest, TUser } from '../../shared/types/user';
import AuthAPI from '../../services/api/auth-api';
import { Link } from 'react-router-dom';

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
    console.error('EEEEEEEEEEEE', err);
  };

  return (
    <>
      <div>SignInPage</div>
      <hr />
      <div>Login: {login}</div>
      <div>Password: {password}</div>
      <button onClick={auth}>Sign in</button>

      <div>
        <Link to="/signup">Register</Link>
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
    </>
  );
};
