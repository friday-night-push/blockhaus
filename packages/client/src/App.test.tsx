import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from './router';

const router = createMemoryRouter(routes, {
  initialEntries: ['/'],
  initialIndex: 0,
});

test('Signin loading page test', async () => {
  render(<RouterProvider router={router} />);
  expect(screen.getByText('SignInPage')).toBeDefined();
});
