import userEvent from '@testing-library/user-event';

import { render, screen } from 'src/utils/tests';

import { mockedUser } from 'src/utils/tests/mocks';

import { mockedUseNavigate } from 'src/utils/tests/mocks';

import { Header } from './Header';

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with back button when hasBackButton is true', () => {
    render(<Header hasBackButton={true} />);
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('renders without back button when hasBackButton is false', () => {
    render(<Header hasBackButton={false} />);
    expect(screen.queryByText('Back')).not.toBeInTheDocument();
  });

  it('renders user when user is provided', () => {
    render(<Header hasBackButton={false} />, {
      authState: { user: mockedUser, userIsLoading: false },
    });
    expect(screen.getByText(mockedUser.display_name)).toBeInTheDocument();
  });

  it('navigates back when the back button is clicked', async () => {
    render(<Header hasBackButton={true} />);

    const user = userEvent.setup();
    await user.click(screen.getByText('Back'));
    expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
  });
});
