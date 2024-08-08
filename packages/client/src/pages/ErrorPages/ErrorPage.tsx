import { Text } from '@gravity-ui/uikit';

import { useNavigate } from 'react-router-dom';

import { Button, Container, Page } from 'src/components';
import { PAGE_ROUTES } from 'src/utils/constants';

export type ErrorCode = '404' | '500';

export type ErrorPageProps = {
  errorCode?: ErrorCode;
};

const errorMessages = {
  404: {
    title: 'Oh No!',
    code: '#404',
    message: 'You’ve hit a block that doesn’t exist.',
  },
  500: {
    title: 'Something went wrong!',
    code: '#500',
    message: 'We know about it and we’re working on it!',
  },
};

export const ErrorPage = ({ errorCode = '404' }: ErrorPageProps) => {
  const navigate = useNavigate();

  const { title, code, message } = errorMessages[errorCode];

  const onReturn = () => {
    navigate(PAGE_ROUTES.MENU);
  };

  return (
    <Page isFullWidth withHeader>
      <Container alignItems={'center'} gap={8} grow>
        <Text variant="display-4">{title}</Text>
        <Container direction={'column'}>
          <Text variant="subheader-1">{code}</Text>
          <Text variant="code-2">{message}</Text>
        </Container>
        <Button view="flat-secondary" size="xl" onClick={onReturn}>
          Return to Start
        </Button>
      </Container>
    </Page>
  );
};
