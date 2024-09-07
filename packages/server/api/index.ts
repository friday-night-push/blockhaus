import { Router } from 'express';

import { commentRouter } from './comment';
import { replyRouter } from './reply';
import { topicRouter } from './topic';
import { errorHandlerMiddleware } from '../middlewares/error-handler';
import { yaProxyMiddleware } from '../middlewares/ya-proxy';

export const apiRouter = Router();

apiRouter.use('/topics', topicRouter);
apiRouter.use('/comments', commentRouter);
apiRouter.use('/replies', replyRouter);

apiRouter.use(errorHandlerMiddleware);
apiRouter.use('/', yaProxyMiddleware);
