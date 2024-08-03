import { Menu, Skeleton, User } from '@gravity-ui/uikit';

import logoWithBlocks from 'src/assets/logo-w-blocks.svg';

import { Container, MenuItem, MenuItemProps } from 'src/components/atoms';

import { Copyright } from 'src/components/molecules';

import { AppContext } from 'src/components/organisms/App/App.context';

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
              {appData.user &&
                (appData.loading ? (
                  <Skeleton />
                ) : (
                  <User
                    size={'xl'}
                    avatar={{ imgUrl: appData.user?.avatar }}
                    name={appData.user?.first_name}
                    description={appData.user?.email}
                  />
                ))}
              <Menu size={'xl'}>
                <Container direction={'column'} alignItems={'center'}>
                  {MENU_ITEMS.map(item => (
                    <MenuItem key={item.label} {...item} />
                  ))}
                </Container>
              </Menu>
            </>
          )}
        </AppContext.Consumer>
      </Container>
      <Copyright />
    </Container>
  );
};
