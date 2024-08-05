import React from 'react';

import { Text, UserLabel } from '@gravity-ui/uikit';

import { Container, Page } from 'src/components';

import { LEADERBOARD_MOCK } from './LeaderBoardPage.mock';

export const LeaderBoardPage = () => {
  return (
    <Page withHeader hasBackButton isFullWidth>
      <Container
        direction={'column'}
        alignItems={'center'}
        width={'100%'}
        gap={8}
        grow>
        <Container direction={'column'} centerContent>
          <Text variant={'display-1'}>Here some of the best players</Text>
          <Text variant={'subheader-1'}>You can be one of them</Text>
        </Container>
        <Container direction={'column'} gap={2}>
          {LEADERBOARD_MOCK.map(user => (
            <Container
              key={user.id}
              alignItems={'center'}
              width={'340px'}
              justifyContent={'space-between'}>
              <UserLabel size={'xl'} view={'clear'}>
                {user.name}
              </UserLabel>
              <Text variant={'subheader-3'}>{user.score}</Text>
            </Container>
          ))}
        </Container>
      </Container>
    </Page>
  );
};
