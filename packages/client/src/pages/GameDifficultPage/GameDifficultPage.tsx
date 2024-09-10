import type { FC } from 'react';
import { useEffect } from 'react';

import { Menu } from '@gravity-ui/uikit';

import { useDispatch, useSelector } from 'react-redux';

import { Container } from 'src/components/atoms/Container';
import { Logo } from 'src/components/atoms/Logo';
import type { MenuItemProps } from 'src/components/atoms/MenuItem';

import { MenuItem } from 'src/components/atoms/MenuItem';
import { Copyright } from 'src/components/molecules/Copyright';
import { Page } from 'src/components/organisms/Page';

import { PAGE_ROUTES } from 'src/utils/constants';

import type { RootState } from '../../store';
import { setGameType } from '../../store';

export interface GameProps {
  gameType: number;
}

export const GameDifficultPage: FC<GameProps> = ({ gameType }) => {
  const dispatch = useDispatch();
  const gameTypeState = useSelector((state: RootState) => state.example.gameType);

  const goGame = (gameType: number) => {
    // сохранить в хранилище gameType
    // и вызвать PAGE_ROUTES.GAME
    dispatch(setGameType(gameType));
  };

  const MENU_ITEMS: MenuItemProps[] = [
    { label: 'easy', href: PAGE_ROUTES.GAME, onClick: () => goGame(0) },
    { label: 'medium', href: PAGE_ROUTES.GAME, onClick: () => goGame(1) },
    { label: 'hard', href: PAGE_ROUTES.GAME, onClick: () => goGame(2) },
    { label: 'nightmare', href: PAGE_ROUTES.GAME, onClick: () => goGame(3) },
  ];

  return (
    <Page>
      <Logo isFull size='auto' />
      <Menu size={'xl'}>
        <Container direction={'column'} alignItems={'center'}>
          {MENU_ITEMS.map(item => (
            <MenuItem key={item.label} {...item} />
          ))}
        </Container>
      </Menu>
      <Copyright />
    </Page>
  );
};
