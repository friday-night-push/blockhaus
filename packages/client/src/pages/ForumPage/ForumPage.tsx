import type { LoaderFunction } from 'react-router-dom';
import { Link, useLoaderData } from 'react-router-dom';

import { PAGE_ROUTES } from 'src/utils/constants';

import type { TopicsType } from './ForumPage.types';

// Simulating a request to the server
export const topicsLoader: LoaderFunction = async (): Promise<TopicsType[]> => {
  return [
    {
      name: 'Announcement',
      id: 1,
      commentCount: 10,
    },
    {
      name: 'Complaints',
      id: 2,
      commentCount: 0,
    },
  ];
};

export const ForumPage = () => {
  const topics = useLoaderData() as TopicsType[];

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {topics.map(topic => (
        <Link key={topic.id} to={`${PAGE_ROUTES.FORUM}/${topic.id}${topic.commentCount ? '/1' : ''}`}>
          {topic.name}
        </Link>
      ))}
    </div>
  );
};
