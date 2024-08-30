import userEvent from '@testing-library/user-event';

import { PAGE_ROUTES } from 'src/utils/constants';
import { render, screen } from 'src/utils/tests';

import { mockedUseNavigate, mockedUser } from 'src/utils/tests/mocks';

import { SignInPage } from './SignInPage';
import { USER_DATA_MOCK } from './SignInPage.constants';
import { authAPI } from '../../hoc/AuthProvider';

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
    await user.click(screen.getByRole('button', { name: 'Back' }));
    expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
  });

  it('navigates to sign up on sign up button click', async () => {
    render(<SignInPage />);

    const user = userEvent.setup();
    await user.click(
      screen.getByRole('button', { name: 'First time here? Sign up' })
    );
    expect(mockedUseNavigate).toHaveBeenCalledWith(PAGE_ROUTES.SIGN_UP);
  });

  it('displays an error message on failed sign in', async () => {
    jest.spyOn(authAPI, 'signin').mockImplementation((_, __, errorCb) => {
      errorCb('Invalid credentials');
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
    jest.spyOn(authAPI, 'signin').mockImplementation((data, cb) => {
      cb(new Response(undefined, { status: 200 }));
      return Promise.resolve();
    });

    render(<SignInPage />);

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/login/i), USER_DATA_MOCK.login);
    await user.type(
      screen.getByLabelText(/password/i),
      USER_DATA_MOCK.password
    );
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(authAPI.signin).toHaveBeenCalledWith(
      { login: USER_DATA_MOCK.login, password: USER_DATA_MOCK.password },
      expect.any(Function),
      expect.any(Function)
    );
  });
});
