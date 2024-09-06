import userEvent from '@testing-library/user-event';

import { render, screen } from 'src/utils/tests';

import { mockedUser, mockedUseNavigate } from 'src/utils/tests/mocks';

import { ProfilePage } from './ProfilePage';
import { PAGE_ROUTES } from '../../utils/constants';

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
    await user.click(screen.getByText('Go Back'));
    expect(mockedUseNavigate).toHaveBeenCalledWith(PAGE_ROUTES.MENU);
  });

  it('edit button is on the page', () => {
    render(<ProfilePage />, {
      authState: { user: mockedUser, userIsLoading: false },
    });
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });

  it('shows Save and Reset buttons after Edit button was clicked', async () => {
    render(<ProfilePage />, {
      authState: { user: mockedUser, userIsLoading: false },
    });

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Edit' }));

    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
  });
});
