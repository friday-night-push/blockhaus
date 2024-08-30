import userEvent from '@testing-library/user-event';

import { PAGE_ROUTES } from 'src/utils/constants';
import { render, screen } from 'src/utils/tests';

import { mockedUser, mockedUseNavigate } from 'src/utils/tests/mocks';

import { GameMenuPage, MENU_ITEMS } from './GameMenuPage';

describe('GameMenuPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders sign in option when user is not logged in', () => {
    render(<GameMenuPage />, {
      authState: { user: null, setUser: jest.fn(), userIsLoading: false },
    });

    expect(screen.getByText('sign in')).toBeInTheDocument();
  });

  it('renders user component when user is logged in', () => {
    render(<GameMenuPage />, {
      authState: {
        user: mockedUser,
        userIsLoading: false,
      },
    });
    expect(screen.getByText(mockedUser.display_name)).toBeInTheDocument();
  });

  it('renders all menu items correctly', () => {
    render(<GameMenuPage />);

    MENU_ITEMS.forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it('navigates to menu item that is clicked', async () => {
    render(<GameMenuPage />);

    const user = userEvent.setup();
    const menuItem = MENU_ITEMS[0];

    await user.click(screen.getByText(menuItem.label));

    expect(mockedUseNavigate).toHaveBeenCalledWith(menuItem.href);
  });

  it('navigates to sign in page when menu item is clicked', async () => {
    render(<GameMenuPage />);

    const user = userEvent.setup();
    await user.click(screen.getByText('sign in'));

    expect(mockedUseNavigate).toHaveBeenCalledWith(PAGE_ROUTES.SIGN_IN);
  });
});
