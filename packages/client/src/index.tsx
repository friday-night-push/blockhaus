import React from 'react';

import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';

import { createBrowserRouter } from 'react-router-dom';

import { App } from 'src/components/organisms/App';
import { routes } from 'src/router';
import { store } from 'src/store';

import './index.css';

const router = createBrowserRouter(routes);

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <App router={router} />
    </Provider>
  </React.StrictMode>
);
