import { Router } from 'express';

import { topicRouter } from '../topic/topic.router';

export const apiRouter = Router();

apiRouter.use('/topics', topicRouter);

apiRouter.get('/', (_, res) => {
  res.json('👋 Howdy from the API :)');
});
