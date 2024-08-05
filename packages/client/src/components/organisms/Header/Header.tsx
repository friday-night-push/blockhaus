import React, { useContext } from 'react';

import { ArrowLeft } from '@gravity-ui/icons';
import { Icon } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router-dom';

import { Button, Container, User } from 'src/components';

import { AuthContext } from 'src/hoc';
import { PAGE_ROUTES } from 'src/utils/constants';

export type HeaderProps = {
  hasBackButton?: boolean;
};

export const Header = ({ hasBackButton }: HeaderProps) => {
  const { user, setUser, userIsLoading } = useContext(AuthContext);

  const navigate = useNavigate();

  const goBack = () => {
    if (history.length > 1) {
      navigate(-1);
    } else {
      navigate(PAGE_ROUTES.MENU);
    }
  };

  return (
    <Container
      width={'100%'}
      justifyContent={hasBackButton ? 'space-between' : 'flex-end'}
      alignItems={'center'}
      minHeight={'80px'}
      style={{ padding: '0 20px' }}>
      {hasBackButton && (
        <Button view={'flat'} onClick={goBack}>
          <Icon data={ArrowLeft} />
          Back
        </Button>
      )}
      <User user={user} setUser={setUser} userIsLoading={userIsLoading} />
    </Container>
  );
};
