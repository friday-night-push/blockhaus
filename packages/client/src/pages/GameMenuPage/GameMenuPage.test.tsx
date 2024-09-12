import userEvent from '@testing-library/user-event';

import { Provider } from 'react-redux';

import { createStore } from 'src/store';

import { PAGE_ROUTES } from 'src/utils/constants';
import { render, screen } from 'src/utils/tests';

import { mockedUser, mockedUseNavigate } from 'src/utils/tests/mocks';

import { GameMenuPage } from './GameMenuPage';

const store = createStore();

describe('GameMenuPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders sign in option when user is not logged in', () => {
    render(
      <Provider store={store}>
        <GameMenuPage />
      </Provider>,
      {
        authState: { user: null, setUser: jest.fn(), userIsLoading: false },
      }
    );

    expect(screen.getByText('sign in')).toBeInTheDocument();
  });

  it('renders user component when user is logged in', () => {
    render(
      <Provider store={store}>
        <GameMenuPage />
      </Provider>,
      {
        authState: {
          user: mockedUser,
          userIsLoading: false,
        },
      }
    );
    expect(screen.getByText(mockedUser.display_name)).toBeInTheDocument();
  });

  it('renders all menu items correctly', () => {
    render(
      <Provider store={store}>
        <GameMenuPage />
      </Provider>
    );
    expect(screen.getByText('never-ending')).toBeInTheDocument();
  });

  it('navigates to sign in page when menu item is clicked', async () => {
    render(
      <Provider store={store}>
        <GameMenuPage />
      </Provider>
    );

    const user = userEvent.setup();
    await user.click(screen.getByText('sign in'));

    expect(mockedUseNavigate).toHaveBeenCalledWith(PAGE_ROUTES.SIGN_IN);
  });
});
