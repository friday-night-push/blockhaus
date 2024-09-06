import type { Dispatch, ReactElement, SetStateAction } from 'react';
import React from 'react';

import { ThemeProvider } from '@gravity-ui/uikit';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { AuthContext } from 'src/hoc/AuthProvider';
import type { TUser } from 'src/shared/types/user';

interface AuthState {
  user: TUser | null;
  setUser?: Dispatch<SetStateAction<TUser | null>>;
  userIsLoading: boolean;
}

interface AllTheProvidersProps {
  children: React.ReactNode;
  authState?: AuthState;
}

const AllTheProviders = (props: AllTheProvidersProps) => {
  const { children, authState = { user: null, userIsLoading: false } } = props;
  return (
    <ThemeProvider theme={'light'}>
      <BrowserRouter>
        <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'> & { authState?: AuthState }) =>
  render(ui, {
    wrapper: (props: AllTheProvidersProps) => <AllTheProviders {...props} {...options} />,
    ...options,
  });

export * from '@testing-library/react';
export { customRender as render };
