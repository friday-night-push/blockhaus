import userEvent from '@testing-library/user-event';

import { authAPI } from 'src/hoc/AuthProvider';
import { PAGE_ROUTES } from 'src/utils/constants';
import { render, screen } from 'src/utils/tests';
import { mockedUseNavigate, mockedUser } from 'src/utils/tests/mocks';

import { User } from './User';

jest.mock('src/hoc/AuthProvider', () => ({
  ...jest.requireActual('src/hoc/AuthProvider'),
  authAPI: {
    logout: jest.fn(),
  },
}));

describe('User', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders sign in button when no user is present', () => {
    render(<User user={null} />, {
      authState: { user: null, userIsLoading: false },
    });
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('renders UserLabel when user is present and not in full size', () => {
    render(<User user={mockedUser} />, {
      authState: { user: mockedUser, userIsLoading: false },
    });
    expect(screen.getByText(mockedUser.display_name)).toBeInTheDocument();
  });

  it('renders UserComponent when user is present and in full size', () => {
    render(<User user={mockedUser} isFullSize />, {
      authState: { user: mockedUser, userIsLoading: false },
    });
    expect(screen.getByText(mockedUser.display_name)).toBeInTheDocument();
    expect(screen.getByText(mockedUser.email)).toBeInTheDocument();
  });

  it('calls logout when the logout button is clicked', async () => {
    render(<User user={mockedUser} />, {
      authState: { user: mockedUser, userIsLoading: false, setUser: jest.fn() },
    });

    const user = userEvent.setup();
    await user.click(screen.getByTestId('sign-out-button'));

    expect(authAPI.logout).toHaveBeenCalledTimes(1);
  });

  it('navigates to the profile page when edit button is clicked', async () => {
    render(<User user={mockedUser} isFullSize />, {
      authState: { user: mockedUser, userIsLoading: false },
    });

    const user = userEvent.setup();
    await user.click(screen.getByTestId('edit-button'));

    expect(mockedUseNavigate).toHaveBeenCalledWith(PAGE_ROUTES.PROFILE);
  });
});
