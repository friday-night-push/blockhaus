import { Link, Text } from '@gravity-ui/uikit';

import fnpLogo from 'src/assets/fnp-logo.svg';
import ypLogo from 'src/assets/yp-logo.svg';
import { Container } from 'src/components/atoms';

export const Copyright = () => {
  return (
    <Container alignItems="center" gap={3}>
      <Text variant="code-2">Made in 2024 by</Text>
      <Link href={'https://github.com/friday-night-push/'} target={'_blank'}>
        <img src={fnpLogo} alt="" />
      </Link>
      <Text variant="code-2">at</Text>
      <Link
        href={'https://practicum.yandex.ru/middle-frontend/'}
        target={'_blank'}>
        <img src={ypLogo} alt="" />
      </Link>
    </Container>
  );
};
