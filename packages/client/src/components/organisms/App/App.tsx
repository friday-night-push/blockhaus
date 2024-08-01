import React, { useEffect, useState } from 'react';

import { RouterProvider } from 'react-router-dom';

import { authAPI } from 'src/pages';
import { router } from 'src/router';

import { TUser } from 'src/shared/types/user';

import Helpers from 'src/utils/helpers';

import { AppContext } from './App.context';

export const App = () => {
  const [user, setUser] = useState<TUser>({} as TUser);

  const appData = {
    user,
  };

  const isAuthenticated = () => {
    authAPI.getuser(updateUser, errorHandler).then(data => console.log(data));
  };

  const updateUser = (user: TUser) => {
    setUser(user);
  };

  const errorHandler = (err: unknown) => {
    Helpers.Log('ERROR', err);
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <AppContext.Provider value={appData}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
};
