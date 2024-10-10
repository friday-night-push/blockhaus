import React, { useEffect, useState } from 'react';

import { Text, UserLabel } from '@gravity-ui/uikit';

import { Container } from 'src/components/atoms/Container';
import { Page } from 'src/components/organisms/Page';

import { LEADERBOARD_MOCK } from './LeaderBoardPage.mock';

import LeaderboardAPI from '../../services/api/leaderboard-api';

const lbApi = new LeaderboardAPI();

export const LeaderBoardPage = () => {
  const [showLb, setShowLb] = useState(false);
  // const [lb, setLb] = useState<any[]>([]);

  useEffect(() => {
    const loadLeaderboard = async () => {
      await lbApi.getLeaderboard(updateLb, (err: Error) => {
        console.error(err);
        setShowLb(false);
      });
    };

    loadLeaderboard();
  }, []);

  const updateLb = (data: any) => {
    console.info(data);
    setShowLb(data.length > 0);
  };

  return (
    <Page title='Leaderboards' withHeader hasBackButton isFullWidth>
      <Container direction='column' alignItems='center' width='100%' gap={8} grow>
        <Container direction='column' gap={2}>
          {showLb &&
            LEADERBOARD_MOCK.map(user => (
              <Container key={user.id} alignItems='center' width='340px' justifyContent='space-between'>
                <UserLabel size='xl' view='clear'>
                  {user.name}
                </UserLabel>
                <Text variant='subheader-3'>{user.score}</Text>
              </Container>
            ))}
          {!showLb && <Text variant='subheader-1'>No leaderboard data</Text>}
        </Container>
      </Container>
    </Page>
  );
};
