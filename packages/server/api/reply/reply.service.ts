import type { CreateReplyDto } from './reply.dto';
import { ReplyModel } from './reply.model';

export class ReplyService {
  static async createReply(createData: CreateReplyDto) {
    return await ReplyModel.create(createData);
  }

  static async getRepliesByCommentId(commentId: CreateReplyDto['commentId']) {
    return await ReplyModel.findAll({
      where: {
        commentId,
      },
    });
  }

  static async getReply(id: number) {
    return await ReplyModel.findByPk(id);
  }

  static async updateReply(id: number, updateData: Partial<CreateReplyDto>) {
    const reply = await ReplyModel.findByPk(id);
    if (!reply) {
      throw new Error('Reply not found');
    }
    return await reply.update(updateData);
  }

  static async deleteReply(id: number) {
    const reply = await ReplyModel.findByPk(id);
    if (!reply) {
      throw new Error('Reply not found');
    }
    return await reply.destroy();
  }
}
