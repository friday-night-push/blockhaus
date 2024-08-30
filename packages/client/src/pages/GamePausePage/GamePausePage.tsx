import { Menu } from '@gravity-ui/uikit';

import { Container } from 'src/components/atoms/Container';
import type { MenuItemProps } from 'src/components/atoms/MenuItem';
import { MenuItem } from 'src/components/atoms/MenuItem';
import { Page } from 'src/components/organisms/Page';
import { PAGE_ROUTES } from 'src/utils/constants';

const MENU_ITEMS: MenuItemProps[] = [
  { label: 'resume', href: PAGE_ROUTES.GAME },
  { label: 'stop', href: PAGE_ROUTES.MENU, theme: 'danger' },
];

export const GamePausePage = () => {
  return (
    <Page>
      <Menu size={'xl'}>
        <Container direction={'column'} alignItems={'center'}>
          {MENU_ITEMS.map(item => (
            <MenuItem key={item.label} {...item} />
          ))}
        </Container>
      </Menu>
    </Page>
  );
};
