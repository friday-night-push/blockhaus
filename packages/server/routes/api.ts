import { Router } from 'express';

import { topicRouter } from './topic';

export const apiRouter = Router();

apiRouter.use('/topics', topicRouter);

apiRouter.get('/', (_, res) => {
  res.json('👋 Howdy from the API :)');
});
