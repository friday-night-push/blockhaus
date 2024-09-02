import userEvent from '@testing-library/user-event';

import { render, screen } from 'src/utils/tests';

import { mockedUser, mockedUseNavigate } from 'src/utils/tests/mocks';

import { ProfilePage } from './ProfilePage';

describe('ProfilePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loader when user is loading', () => {
    render(<ProfilePage />, { authState: { user: null, userIsLoading: true } });
  });

  it('displays user information when loaded', () => {
    render(<ProfilePage />, {
      authState: { user: mockedUser, userIsLoading: false },
    });

    expect(screen.getByText(mockedUser.display_name)).toBeInTheDocument();
  });

  it('navigates back to the previous page when clicking back', async () => {
    render(<ProfilePage />, {
      authState: { user: mockedUser, userIsLoading: false },
    });

    const user = userEvent.setup();
    await user.click(screen.getByText('Back'));
    expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
  });

  it('save button is disabled when no changes are made', () => {
    render(<ProfilePage />, {
      authState: { user: mockedUser, userIsLoading: false },
    });
    expect(screen.getByRole('button', { name: 'Save' }).hasAttribute('disabled')).toBeTruthy();
  });
});
