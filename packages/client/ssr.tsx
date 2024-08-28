import React from 'react';

import { ThemeProvider } from '@gravity-ui/uikit';
import { renderToString } from 'react-dom/server';

import { App } from './src/components/organisms/App';

export async function render(uri: string) {
  return {
    html: renderToString(
      <React.StrictMode>
        <ThemeProvider theme={'light'}>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    ),
  };
}
