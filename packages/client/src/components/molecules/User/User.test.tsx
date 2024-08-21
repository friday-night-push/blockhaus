import userEvent from '@testing-library/user-event';

import { AuthContext } from 'src/hoc/AuthProvider';
import { authAPI } from 'src/hoc/AuthProvider';
import type { TUser } from 'src/shared/types/user';
import { PAGE_ROUTES } from 'src/utils/constants';
import { render, screen } from 'src/utils/tests';
import { mockedUseNavigate } from 'src/utils/tests/mocks';

import { User } from './User';

jest.mock('src/hoc/AuthProvider', () => ({
  ...jest.requireActual('src/hoc/AuthProvider'),
  authAPI: {
    logout: jest.fn(),
  },
}));

describe('User', () => {
  const mockUser: TUser = {
    id: 1,
    first_name: 'John',
    second_name: 'Doe',
    display_name: 'johndoe',
    avatar: '/path/to/avatar.jpg',
    email: 'john.doe@example.com',
    login: 'johndoe123',
    phone: '+1234567890',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders sign in button when no user is present', () => {
    render(
      <AuthContext.Provider value={{ user: null }}>
        <User user={null} />
      </AuthContext.Provider>
    );
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('renders UserLabel when user is present and not in full size', () => {
    render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <User user={mockUser} />
      </AuthContext.Provider>
    );
    expect(screen.getByText(mockUser.display_name)).toBeInTheDocument();
  });

  it('renders UserComponent when user is present and in full size', () => {
    render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <User user={mockUser} isFullSize />
      </AuthContext.Provider>
    );
    expect(screen.getByText(mockUser.display_name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });

  it('calls logout when the logout button is clicked', async () => {
    render(
      <AuthContext.Provider value={{ user: mockUser, setUser: jest.fn() }}>
        <User user={mockUser} />
      </AuthContext.Provider>
    );

    const user = userEvent.setup();
    await user.click(screen.getByTestId('sign-out-button'));

    expect(authAPI.logout).toHaveBeenCalledTimes(1);
  });

  it('navigates to the profile page when edit button is clicked', async () => {
    render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <User user={mockUser} isFullSize />
      </AuthContext.Provider>
    );

    const user = userEvent.setup();
    await user.click(screen.getByTestId('edit-button'));

    expect(mockedUseNavigate).toHaveBeenCalledWith(PAGE_ROUTES.PROFILE);
  });
});
