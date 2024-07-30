import logoWithBlocks from 'src/assets/logo-w-blocks.svg';

import { Container, MenuItem, MenuItemProps } from 'src/components/atoms';

import { Copyright } from '../../components/molecules';

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
        {MENU_ITEMS.map(item => (
          <MenuItem key={item.label} {...item} />
        ))}
      </Container>
      <Copyright />
    </Container>
  );
};
