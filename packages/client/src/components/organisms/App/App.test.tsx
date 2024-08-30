import { render, screen } from '@testing-library/react';
import { createBrowserRouter } from 'react-router-dom';

import { routes } from 'src/router';

import { App } from './App';

describe('App', () => {
  it('should render', () => {
    const router = createBrowserRouter(routes);
    render(<App router={router} />);
    expect(screen.getByText(/ade in 2024 by/i)).toBeInTheDocument();
  });
});
