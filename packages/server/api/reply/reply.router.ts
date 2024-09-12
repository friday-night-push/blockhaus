import { Router } from 'express';

import { ReplyController } from './reply.controller';
import { checkAuthMiddleware } from '../../middlewares/check-auth';

export const replyRouter = Router();

replyRouter.use(checkAuthMiddleware);
replyRouter.get('/comment/:commentId', ReplyController.getRepliesByCommendId);
replyRouter.post('/comment/:commentId', ReplyController.createReply);

replyRouter.get('/:id', ReplyController.getReply);
replyRouter.put('/:id', ReplyController.updateReply);
replyRouter.delete('/:id', ReplyController.deleteReply);
