import { User } from '@gravity-ui/uikit';

import logoWithBlocks from 'src/assets/logo-w-blocks.svg';

import { Container, MenuItem, MenuItemProps } from 'src/components/atoms';

import { Copyright } from '../../components/molecules';
import { AppContext } from '../../components/organisms/App/App.context';

const MENU_ITEMS: MenuItemProps[] = [
  { label: 'play', href: '/game' },
  {
    label: 'sign in',
    href: '/sign-in',
  },
  { label: 'about', href: '/about' },
];

export const GameMenuPage = () => {
  return (
    <Container
      minHeight={'100vh'}
      direction={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      gap={8}>
      <img src={logoWithBlocks} alt="" />
      <Container
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={4}>
        <AppContext.Consumer>
          {appData => (
            <>
              {appData.user && (
                <User
                  size={'xl'}
                  avatar={appData.user?.avatar}
                  name={appData.user?.first_name}
                  description={appData.user?.email}
                />
              )}
              {MENU_ITEMS.map(item => (
                <MenuItem key={item.label} {...item} />
              ))}
            </>
          )}
        </AppContext.Consumer>
      </Container>
      <Copyright />
    </Container>
  );
};
