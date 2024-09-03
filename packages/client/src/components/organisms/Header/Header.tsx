import React, { useContext } from 'react';

import { ArrowLeft } from '@gravity-ui/icons';
import { Icon } from '@gravity-ui/uikit';

import { Container } from 'src/components/atoms/Container';
import { BackButton } from 'src/components/molecules/BackButton/BackButton';
import { User } from 'src/components/molecules/User';
import { AuthContext } from 'src/hoc/AuthProvider';
import { PAGE_ROUTES } from 'src/utils/constants';

export type HeaderProps = {
  hasBackButton?: boolean;
};

export const Header = ({ hasBackButton }: HeaderProps) => {
  const { user, setUser, userIsLoading } = useContext(AuthContext);

  return (
    <Container
      width={'100%'}
      justifyContent={hasBackButton ? 'space-between' : 'flex-end'}
      alignItems={'center'}
      minHeight={'80px'}
      style={{ padding: '0 20px' }}>
      {hasBackButton && (
        <BackButton fallbackRoute={PAGE_ROUTES.MENU}>
          <Icon data={ArrowLeft} />
          Back
        </BackButton>
      )}
      <User user={user} setUser={setUser} userIsLoading={userIsLoading} />
    </Container>
  );
};
