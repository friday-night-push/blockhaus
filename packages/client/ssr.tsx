import React from 'react';

import { ThemeProvider } from '@gravity-ui/uikit';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

import { App } from './src/components/organisms/App';
import TestApp from './src/test-app';

export async function render(uri: string) {
  return {
    html: renderToString(
      <StaticRouter location={uri}>
        <ThemeProvider theme={'light'}>
          <App />
        </ThemeProvider>
      </StaticRouter>
      // <TestApp />
    ),
  };
}
