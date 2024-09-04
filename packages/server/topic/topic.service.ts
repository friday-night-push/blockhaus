import { TopicModel, type TopicCreationAttributes } from './topic.model';

export class TopicService {
  static async getTopics() {
    return await TopicModel.findAll();
  }

  static async createTopic(topic: TopicCreationAttributes) {
    return await TopicModel.create(topic);
  }
}
