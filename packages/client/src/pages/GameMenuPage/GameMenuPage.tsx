import { useContext, useEffect } from 'react';

import { Menu } from '@gravity-ui/uikit';

import { useNavigate, useSearchParams } from 'react-router-dom';

import { Container } from 'src/components/atoms/Container';
import { Logo } from 'src/components/atoms/Logo';
import type { MenuItemProps } from 'src/components/atoms/MenuItem';

import { MenuItem } from 'src/components/atoms/MenuItem';
import { Copyright } from 'src/components/molecules/Copyright';
import { User } from 'src/components/molecules/User';
import { Page } from 'src/components/organisms/Page';
import { AuthContext } from 'src/hoc/AuthProvider';

import AuthAPI from 'src/services/api/auth-api';

import type { TUser } from 'src/shared/types/user';
import type { TYandexAuth } from 'src/shared/types/yandex';

import { PAGE_ROUTES } from 'src/utils/constants';

import Helpers from 'src/utils/helpers';

export const MENU_ITEMS: MenuItemProps[] = [
  { label: 'never-ending', href: PAGE_ROUTES.GAME },
  { label: 'race the clock', href: PAGE_ROUTES.GAME },
  {
    label: 'leaderboards',
    href: PAGE_ROUTES.LEADER_BOARD,
  },
];

let firtsStart = 0;

const authAPI = new AuthAPI();

export const GameMenuPage = () => {
  const { user, setUser, userIsLoading } = useContext(AuthContext);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const auth = async (data: TYandexAuth) => {
    console.info('auth');
    await authAPI.yaSignInUp(data, isAuthOk, errorAuthHandler);
  };

  const getUser = async () => {
    await authAPI.getuser(updateUser, errorHandler);
  };

  const updateUser = (user: TUser) => {
    if (setUser) {
      localStorage.setItem('isAuth', 'true');
      setUser(user);
      navigate(PAGE_ROUTES.MENU);
    }
  };

  const isAuthOk = () => {
    getUser();
  };

  const errorAuthHandler = (err: Error) => {
    if (err.message === 'User already in system') {
      getUser();
    }
    Helpers.Log('ERROR', err);
  };

  const errorHandler = (err: Error) => {
    Helpers.Log('ERROR', err);
  };

  useEffect(() => {
    if (firtsStart == 0) {
      const code = searchParams.get('code');
      const cid = searchParams.get('cid');
      if (code != null && cid != null) {
        const data: TYandexAuth = {
          code,
          redirect_uri: 'http://localhost:3000',
        };
        auth(data);
      } else {
        const isAuth = localStorage.getItem('isAuth');
        if (isAuth !== null) getUser();
      }
    }

    firtsStart++;
  }, []);

  return (
    <Page>
      <Logo isFull size='auto' />
      <Menu size={'xl'}>
        <Container direction={'column'} alignItems={'center'}>
          {user && user.id ? (
            <User
              user={user}
              setUser={setUser}
              userIsLoading={userIsLoading}
              isFullSize
            />
          ) : (
            <MenuItem
              label={'sign in'}
              onClick={() => navigate(PAGE_ROUTES.SIGN_IN)}
            />
          )}
          {MENU_ITEMS.map(item => (
            <MenuItem key={item.label} {...item} />
          ))}
        </Container>
      </Menu>
      <Copyright />
    </Page>
  );
};
