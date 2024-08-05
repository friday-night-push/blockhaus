import { LoaderFunction, useLoaderData, useParams } from 'react-router-dom';

import { CommentType, TopicType } from './ForumTopicPage.types';

// Simulating a request to the server
export const topicInfo: LoaderFunction = async ({
  params,
}): Promise<TopicType> => {
  return {
    id: 1,
    name: 'Announcement',
    text: `Info about topic ${params.topicId} `, // It's temporary logic, just to remove comments for 'Complaints' page
    ...(params.topicId === '1' && {
      comments: [
        {
          id: 1,
          author: 'Ivan',
          text: 'Hello!',
        },
      ],
    }),
  };
};

export const ForumTopicPage = () => {
  const topicInfo = useLoaderData() as TopicType;
  const { topicId } = useParams();

  return (
    <div>
      <h1>Topic Page {topicId}</h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p> {topicInfo.text}</p>
        {topicInfo?.comments?.map((comment: CommentType) => {
          return (
            <div
              style={{
                width: '300px',
                height: '100px',
                border: '1px solid black',
              }}>
              <h2>{comment.author}</h2>
              <p>{comment.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
