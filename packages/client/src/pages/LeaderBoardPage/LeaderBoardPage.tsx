import React from 'react';

import { Text, UserLabel } from '@gravity-ui/uikit';

import { Container } from 'src/components/atoms/Container';
import { Page } from 'src/components/organisms/Page';

import { LEADERBOARD_MOCK } from './LeaderBoardPage.mock';

export const LeaderBoardPage = () => {
  return (
    <Page title='Leaderboards' withHeader hasBackButton isFullWidth>
      <Container direction='column' alignItems='center' width='100%' gap={8} grow>
        <Container direction='column' gap={2}>
          {LEADERBOARD_MOCK.map(user => (
            <Container key={user.id} alignItems='center' width='340px' justifyContent='space-between'>
              <UserLabel size='xl' view='clear'>
                {user.name}
              </UserLabel>
              <Text variant='subheader-3'>{user.score}</Text>
            </Container>
          ))}
        </Container>
      </Container>
    </Page>
  );
};
