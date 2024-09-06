import type { RequestHandler } from 'express';

import { createTopicDto } from './topic.dto';
import { TopicService } from './topic.service';
import { logger } from '../../utils';

export class TopicController {
  static createTopic: RequestHandler = async (req, res, next) => {
    const validation = createTopicDto.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ message: validation.error.errors });
    }

    try {
      const topic = await TopicService.createTopic(req.body);
      return res.status(201).json(topic);
    } catch (e) {
      logger.error(e);
      return next(e);
    }
  };

  static getTopics: RequestHandler = async (_, res, next) => {
    try {
      const topics = await TopicService.getTopics();
      res.status(200).json(topics);
    } catch (e) {
      next(e);
    }
  };

  static getTopic: RequestHandler = async (req, res, next) => {
    const topicId = Number(req.params.id);

    if (isNaN(topicId)) {
      return res.status(400).json({ message: 'Invalid topic ID' });
    }

    try {
      const topic = await TopicService.getTopic(topicId);
      if (!topic) {
        return res.status(404).json({ message: 'Topic not found' });
      }
      return res.status(200).json(topic);
    } catch (e) {
      logger.error(e);
      return next(e);
    }
  };

  static updateTopic: RequestHandler = async (req, res, next) => {
    const topicId = Number(req.params.id);
    const validation = createTopicDto.partial().safeParse(req.body);

    if (isNaN(topicId)) {
      return res.status(400).json({ message: 'Invalid topic ID' });
    }

    if (!validation.success) {
      return res.status(400).json({ message: validation.error.errors });
    }

    try {
      const updatedTopic = await TopicService.updateTopic(topicId, req.body);
      return res.status(200).json(updatedTopic);
    } catch (e) {
      logger.error(e);
      return next(e);
    }
  };

  static deleteTopic: RequestHandler = async (req, res, next) => {
    const topicId = Number(req.params.id);

    if (isNaN(topicId)) {
      return res.status(400).json({ message: 'Invalid topic ID' });
    }

    try {
      const deletedTopic = await TopicService.deleteTopic(topicId);
      return res.status(200).json(deletedTopic);
    } catch (e) {
      logger.error(e);
      return next(e);
    }
  };
}
