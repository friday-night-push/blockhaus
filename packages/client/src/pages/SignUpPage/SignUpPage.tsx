import { useEffect, useState } from 'react';
import { TSignUpRequest, TUser } from '../../shared/types/user';
import AuthAPI from '../../services/api/auth-api';
import { Link } from 'react-router-dom';

const authAPI = new AuthAPI();

export const SignUpPage = () => {
  const [user, setUser] = useState<TUser>({} as TUser);
  const [data, setData] = useState<TSignUpRequest>({} as TSignUpRequest);

  useEffect(() => {
    const login = Math.floor(Math.random() * 1000);

    const _data: TSignUpRequest = {
      email: `a${login}@mail.mail`,
      first_name: `Fname_${login}`,
      second_name: `Sname_${login}`,
      login: `l${login}`,
      password: '123!!321',
      phone: `+79994447${login}`,
    };

    setData(_data);

    authAPI.signup(_data, updUserData, errorHandler);
  }, []);

  const updUserData = (u: TUser) => {
    setUser(u);
  };

  const errorHandler = (err: unknown) => {
    console.error('EEEEEEEEEEEE', err);
  };

  function logout(): void {
    authAPI.logout(logoutHandler, errorHandler);
  }

  const logoutHandler = () => {
    setUser({} as TUser);
  };

  return (
    <>
      <div>SignUpPage</div>
      <hr />
      <Link to="/">Return to login</Link>
      <hr />
      <div>
        <strong>New user data</strong>
      </div>
      <pre>{JSON.stringify(data, null, '    ')}</pre>
      <hr />
      <div>
        <strong>Register user data</strong>
      </div>
      <pre>{JSON.stringify(user, null, '    ')}</pre>
      <hr />
      <button onClick={logout}>Logout</button>
    </>
  );
};
