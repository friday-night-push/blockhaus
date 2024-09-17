import { Text } from '@gravity-ui/uikit';
import type { LoaderFunction } from 'react-router-dom';
import { useLoaderData, useParams } from 'react-router-dom';

import { Container } from 'src/components/atoms/Container';
import type { TopicProps } from 'src/components/molecules/TopicCard';
import { CommentsSection } from 'src/components/organisms/CommentsSection';
import { mockTopic } from 'src/pages/ForumTopicPage/ForumTopicPage.mock';

export const topicInfo: LoaderFunction = async ({ params }): Promise<TopicProps> => {
  return { ...mockTopic, id: Number(params.topicId) || mockTopic.id };
};

export const ForumTopicPage = () => {
  const topicInfo = useLoaderData() as TopicProps;

  const { topicId } = useParams();

  return (
    <Container direction='column' gap={2} grow maxWidth='580px' spacing={{ px: 4 }}>
      <Text variant='header-1'>
        {topicId}: {topicInfo.name}
      </Text>
      <Container direction='column' spacing={{ mb: 10 }}>
        <p>{topicInfo.text}</p>
        {topicInfo?.comments && <CommentsSection comments={topicInfo.comments} />}
      </Container>
    </Container>
  );
};
