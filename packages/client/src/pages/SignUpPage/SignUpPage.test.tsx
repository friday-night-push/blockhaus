import userEvent from '@testing-library/user-event';

import { PAGE_ROUTES } from 'src/utils/constants';
import { render, screen } from 'src/utils/tests';

import { mockedUseNavigate, mockedUser } from 'src/utils/tests/mocks';

import { SignUpPage } from './SignUpPage';

describe('SignUpPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    const { container } = render(<SignUpPage />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('navigate to menu if user is authenticated', async () => {
    render(<SignUpPage />, {
      authState: {
        user: mockedUser,
        userIsLoading: false,
      },
    });
    expect(screen.queryByText('Sign up')).not.toBeInTheDocument();
  });

  it('navigates back on back button click', async () => {
    render(<SignUpPage />);

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Go Back' }));
    expect(mockedUseNavigate).toHaveBeenCalledWith(PAGE_ROUTES.MENU);
  });

  it('navigates to sign in on sign in button click', async () => {
    render(<SignUpPage />);

    const user = userEvent.setup();
    await user.click(screen.getByRole('link', { name: 'Signed up already? Sign In' }));
    expect(location.href).toMatch(PAGE_ROUTES.SIGN_IN);
  });
});
