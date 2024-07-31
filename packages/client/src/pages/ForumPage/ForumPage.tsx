import { Link, LoaderFunction, useLoaderData } from 'react-router-dom';
import { TopicsType } from './ForumPage.types';

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
        <>
          <Link to={`/forum/${topic.id}${topic.commentCount ? '/1' : ''}`}>
            {topic.name}
          </Link>
        </>
      ))}
    </div>
  );
};
