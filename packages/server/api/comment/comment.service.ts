import type { CreateCommentDto } from './comment.dto';
import { CommentModel } from './comment.model';
import { NotFoundError } from '../../utils';

export class CommentService {
  static async createComment(createData: CreateCommentDto) {
    return await CommentModel.create(createData);
  }

  static async getCommentsByTopicId(topicId: CreateCommentDto['topicId']) {
    return await CommentModel.findAll({
      where: {
        topicId,
      },
    });
  }

  static async getComment(id: number) {
    return await CommentModel.findByPk(id);
  }

  static async updateComment(
    id: number,
    updateData: Partial<CreateCommentDto>
  ) {
    const comment = await CommentModel.findByPk(id);

    if (!comment) {
      throw new NotFoundError('Comment not found');
    }

    return await comment.update(updateData);
  }

  static async deleteComment(id: number) {
    const comment = await CommentModel.findByPk(id);

    if (!comment) {
      throw new NotFoundError('Comment not found');
    }

    return await comment.destroy();
  }
}
