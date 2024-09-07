import type { CreateTopicDto } from './topic.dto';
import { TopicModel } from './topic.model';
import { NotFoundError } from '../../utils';
import { CommentModel } from '../comment';

export class TopicService {
  static async createTopic(topic: CreateTopicDto) {
    return await TopicModel.create(topic);
  }

  static async getTopics() {
    return await TopicModel.findAll({
      include: [
        {
          model: CommentModel,
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [
            // eslint-disable-next-line
            TopicModel.sequelize!.fn(
              'COUNT',
              // eslint-disable-next-line
              TopicModel.sequelize!.col('comments.id')
            ),
            'commentCount',
          ],
        ],
      },
      group: ['TopicModel.id'],
    });
  }

  static async getTopic(id: number) {
    return await TopicModel.findByPk(id, {
      include: [
        {
          model: CommentModel,
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [
            // eslint-disable-next-line
            TopicModel.sequelize!.fn(
              'COUNT',
              // eslint-disable-next-line
              TopicModel.sequelize!.col('comments.id')
            ),
            'commentCount',
          ],
        ],
      },
      group: ['TopicModel.id'],
    });
  }

  static async updateTopic(id: number, updateData: Partial<CreateTopicDto>) {
    const topic = await TopicModel.findByPk(id);

    if (!topic) {
      throw new NotFoundError('Topic not found');
    }

    return await topic.update(updateData);
  }

  static async deleteTopic(id: number) {
    const topic = await TopicModel.findByPk(id);

    if (!topic) {
      throw new NotFoundError('Topic not found');
    }

    return await topic.destroy();
  }
}
