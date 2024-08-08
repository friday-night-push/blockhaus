import React from 'react';

import { RouterProvider } from 'react-router-dom';

import { AuthProvider } from 'src/hoc/AuthProvider';
import { router } from 'src/router';

export const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
