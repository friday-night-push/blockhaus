import { PAGE_ROUTES } from 'src/utils/constants';
import { render, screen } from 'src/utils/tests';

import { mockedUseNavigate, mockedUser } from 'src/utils/tests/mocks';

import { LOADER_ID, ProtectedRoute } from './ProtectedRoute';

describe('ProtectedRoute', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const testElement = <div>Test</div>;

  it('show loading if user is loading', () => {
    render(<ProtectedRoute element={testElement} />, {
      authState: {
        user: null,
        userIsLoading: true,
      },
    });

    expect(screen.getByTestId(LOADER_ID)).toBeInTheDocument();
  });

  it('navigate to sign in if user is not authenticated', () => {
    render(<ProtectedRoute element={testElement} />, {
      authState: {
        user: null,
        userIsLoading: false,
      },
    });

    expect(mockedUseNavigate).toHaveBeenCalledWith(PAGE_ROUTES.SIGN_IN);
  });

  it('renders the element if user is authenticated', () => {
    render(<ProtectedRoute element={testElement} />, {
      authState: {
        user: mockedUser,
        userIsLoading: false,
      },
    });

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
