import userEvent from '@testing-library/user-event';

import { authAPI } from 'src/hoc/AuthProvider';
import { PAGE_ROUTES } from 'src/utils/constants';
import { render, screen } from 'src/utils/tests';

import { mockedUseNavigate, mockedUser } from 'src/utils/tests/mocks';

import { SignInPage } from './SignInPage';
import { USER_DATA_MOCK } from './SignInPage.constants';

describe('SignInPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    const { container } = render(<SignInPage />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('navigates to menu if user is authenticated', async () => {
    render(<SignInPage />, {
      authState: {
        user: mockedUser,
        userIsLoading: false,
      },
    });

    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
  });

  it('navigates back on back button click', async () => {
    render(<SignInPage />);

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Go Back' }));

    expect(mockedUseNavigate).toHaveBeenCalledWith(PAGE_ROUTES.MENU);
  });

  it('navigates to sign up on sign up button click', async () => {
    render(<SignInPage />);

    const user = userEvent.setup();
    await user.click(screen.getByRole('link', { name: 'First time here? Sign up' }));
    expect(location.href).toMatch(PAGE_ROUTES.SIGN_UP);
  });

  it('displays an error message on failed sign in', async () => {
    jest.spyOn(authAPI, 'signIn').mockImplementation((_, __, errorCb) => {
      errorCb(new Error('Invalid credentials'));
      return Promise.resolve();
    });

    render(<SignInPage />);

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/login/i), 'wrong_login');
    await user.type(screen.getByLabelText(/password/i), 'wrong_password');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText(/Invalid credentials/i)).toBeInTheDocument();
  });

  it('calls signin with correct data', async () => {
    jest.spyOn(authAPI, 'signIn').mockImplementation((data, cb) => {
      cb(new Response(undefined, { status: 200 }));
      return Promise.resolve();
    });

    render(<SignInPage />);

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/login/i), USER_DATA_MOCK.login);
    await user.type(screen.getByLabelText(/password/i), USER_DATA_MOCK.password);
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(authAPI.signIn).toHaveBeenCalledWith(
      { login: USER_DATA_MOCK.login, password: USER_DATA_MOCK.password },
      expect.any(Function),
      expect.any(Function)
    );
  });
});
