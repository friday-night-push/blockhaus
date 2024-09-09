import { Router } from 'express';

import { commentRouter } from './comment';
import { replyRouter } from './reply';
import { topicRouter } from './topic';
import { errorHandlerMiddleware } from '../middlewares/error-handler';
import { yaProxyMiddleware } from '../middlewares/ya-proxy';
import { setupSwagger } from '../utils';

export const apiRouter = Router();

apiRouter.use('/topics', topicRouter);
apiRouter.use('/comments', commentRouter);
apiRouter.use('/replies', replyRouter);

setupSwagger(apiRouter);
apiRouter.use('/', yaProxyMiddleware);
apiRouter.use(errorHandlerMiddleware);
