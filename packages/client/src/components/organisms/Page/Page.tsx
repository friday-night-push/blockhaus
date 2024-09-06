import { Container } from 'src/components/atoms/Container';

import { Header } from 'src/components/organisms/Header';

export type PageProps = {
  withHeader?: boolean;
  hasBackButton?: boolean;
  isFullWidth?: boolean;
  children?: React.ReactNode;
};

export const Page = ({ withHeader, hasBackButton, isFullWidth, children }: PageProps) => {
  return (
    <Container minHeight={'100vh'} justifyContent={'center'} width={isFullWidth ? '100%' : 'auto'}>
      <Container
        width={'100%'}
        minHeight={'100vh'}
        maxWidth={isFullWidth ? 'none' : '380px'}
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={8}>
        {withHeader && <Header hasBackButton={hasBackButton} />}
        {children}
      </Container>
    </Container>
  );
};
