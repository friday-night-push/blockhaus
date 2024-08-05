import { Text } from '@gravity-ui/uikit';

import { Container, Page } from 'src/components';

export const GamePage = () => {
  return (
    <Page withHeader hasBackButton isFullWidth>
      <Container grow centerContent>
        <Text variant={'display-4'}>The place where game will live</Text>
      </Container>
    </Page>
  );
};
