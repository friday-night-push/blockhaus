import { Router } from 'express';

import { TopicController } from '../controllers/topic';

export const topicRouter = Router();

topicRouter.get('/', TopicController.getTopics);
topicRouter.post('/', TopicController.createTopic);
