import { Router } from 'express';

import { TopicController } from './topic.controller';

export const topicRouter = Router();

topicRouter.get('/', TopicController.getTopics);
topicRouter.post('/', TopicController.createTopic);
