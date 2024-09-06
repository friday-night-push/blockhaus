import { Router } from 'express';

import { commentRouter } from './comment';
import { replyRouter } from './reply';
import { topicRouter } from './topic';

export const apiRouter = Router();

apiRouter.use('/topics', topicRouter);
apiRouter.use('/comments', commentRouter);
apiRouter.use('/replies', replyRouter);

apiRouter.get('/', (_, res) => {
  res.json('👋 Howdy from the API :)');
});
