import type { RequestHandler } from 'express';

import { TopicService } from '../services/topic';

export class TopicController {
  static getTopics: RequestHandler = async (_, res, next) => {
    try {
      const topics = await TopicService.getTopics();
      res.status(200).json(topics);
    } catch (e) {
      next(e);
    }
  };

  static createTopic: RequestHandler = async (req, res, next) => {
    const { name } = req.body;
    try {
      const topic = await TopicService.createTopic({ name });
      res.status(201).json(topic);
    } catch (e) {
      next(e);
    }
  };
}
