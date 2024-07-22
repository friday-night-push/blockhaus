import { render, screen } from '@testing-library/react';
import { SignInPage } from './pages';

const appContent = 'SignInPage';

test('Example test', async () => {
  render(<SignInPage />);
  expect(screen.getByText(appContent)).toBeDefined();
});
