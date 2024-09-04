import { Topic, type TopicCreationAttributes } from '../models/topic';

export class TopicService {
  static async getTopics() {
    return await Topic.findAll();
  }

  static async createTopic(topic: TopicCreationAttributes) {
    return await Topic.create(topic);
  }
}
