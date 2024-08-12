import { Menu, Text } from '@gravity-ui/uikit';

import { Container } from 'src/components/atoms/Container';
import type { MenuItemProps } from 'src/components/atoms/MenuItem';
import { MenuItem } from 'src/components/atoms/MenuItem';
import { Copyright } from 'src/components/molecules/Copyright';
import { Page } from 'src/components/organisms/Page';
import { PAGE_ROUTES } from 'src/utils/constants';

const MENU_ITEMS: MenuItemProps[] = [
  { label: 'resume the game', href: PAGE_ROUTES.GAME },
  { label: 'cancel the game', href: PAGE_ROUTES.MENU },
];

export const GamePausePage = () => {
  return (
    <Page>
      <Text variant="header-1" style={{ textAlign: 'center' }}>
        PAUSE THE GAME
      </Text>
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
