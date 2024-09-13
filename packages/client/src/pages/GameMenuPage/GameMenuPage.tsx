import { useContext, useEffect } from 'react';

import { Menu, Skeleton } from '@gravity-ui/uikit';

import { useDispatch } from 'react-redux';

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

import { Geolocation } from '../../components/organisms';

import { setGameType } from '../../store';

let firtsStart = 0;

const authAPI = new AuthAPI();

export const GameMenuPage = () => {
  const { user, setUser, userIsLoading } = useContext(AuthContext);
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const goGame = (gameType: number) => {
    console.info('gameType', gameType);
    dispatch(setGameType(gameType));
    navigate(PAGE_ROUTES.GAME_DIFFICULT);
  };

  const MENU_ITEMS: MenuItemProps[] = [
    { label: 'never-ending', onClick: () => goGame(0) },
    { label: 'race the clock', onClick: () => goGame(1) },
  ];

  const auth = async (data: TYandexAuth) => {
    console.info('auth');
    await authAPI.yaSignInUp(data, isAuthOk, errorAuthHandler);
  };

  const getUser = async () => {
    await authAPI.getUser(updateUser, errorHandler);
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
          {userIsLoading ? (
            <Skeleton style={{ height: '50px' }} />
          ) : user && user.id ? (
            <>
              <User user={user} setUser={setUser} userIsLoading={userIsLoading} isFullSize />
              <Geolocation />
            </>
          ) : (
            <MenuItem label={'sign in'} onClick={() => navigate(PAGE_ROUTES.SIGN_IN)} />
          )}
          {MENU_ITEMS.map(item => (
            <MenuItem key={item.label} {...item} />
          ))}

          {userIsLoading ? (
            <Skeleton style={{ height: '50px' }} />
          ) : user && user.id ? (
            <MenuItem label={'leaderboards'} onClick={() => navigate(PAGE_ROUTES.LEADER_BOARD)} />
          ) : null}
        </Container>
      </Menu>
      <Copyright />
    </Page>
  );
};
