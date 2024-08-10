import { Menu, Text } from '@gravity-ui/uikit';

import {
  Container,
  Copyright,
  MenuItem,
  MenuItemProps,
  Page,
} from 'src/components';

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
