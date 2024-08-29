import React from 'react';

import { ThemeProvider } from '@gravity-ui/uikit';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

import type { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

import { AuthProvider } from 'src/hoc/AuthProvider';

interface AppProps {
  router: ReturnType<typeof createBrowserRouter>;
}

export const App = (props: AppProps) => {
  const { router } = props;
  return (
    <AuthProvider>
      <ThemeProvider theme={'light'}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
};
