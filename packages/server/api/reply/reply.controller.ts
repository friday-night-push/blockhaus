import type { RequestHandler } from 'express';

import { createReplyDto } from './reply.dto';
import { ReplyService } from './reply.service';
import { logger } from '../../utils';

export class ReplyController {
  static createReply: RequestHandler = async (req, res, next) => {
    const commentId = Number(req.params.commentId);
    const validation = createReplyDto.safeParse({ commentId, ...req.body });

    if (!validation.success) {
      return res.status(400).json({ message: validation.error.errors });
    }

    try {
      const reply = await ReplyService.createReply(validation.data);
      return res.status(201).json(reply);
    } catch (e) {
      logger.error(e);
      return next(e);
    }
  };

  static getRepliesByCommendId: RequestHandler = async (req, res, next) => {
    const validation = createReplyDto.pick({ commentId: true }).safeParse({
      commentId: Number(req.params.commentId),
    });

    if (!validation.success) {
      return res.status(400).json({ message: validation.error.errors });
    }

    try {
      const replies = await ReplyService.getRepliesByCommentId(
        validation.data.commentId
      );
      return res.status(200).json(replies);
    } catch (e) {
      logger.error(e);
      return next(e);
    }
  };

  static getReply: RequestHandler = async (req, res, next) => {
    const replyId = Number(req.params.id);

    if (isNaN(replyId)) {
      return res.status(400).json({ message: 'Invalid reply ID' });
    }

    try {
      const reply = await ReplyService.getReply(replyId);
      if (!reply) {
        return res.status(404).json({ message: 'Reply not found' });
      }
      return res.status(200).json(reply);
    } catch (e) {
      logger.error(e);
      return next(e);
    }
  };

  static updateReply: RequestHandler = async (req, res, next) => {
    const replyId = Number(req.params.id);
    const validation = createReplyDto.partial().safeParse(req.body);

    if (isNaN(replyId)) {
      return res.status(400).json({ message: 'Invalid reply ID' });
    }

    if (!validation.success) {
      return res.status(400).json({ message: validation.error.errors });
    }

    try {
      const updatedReply = await ReplyService.updateReply(replyId, req.body);
      return res.status(200).json(updatedReply);
    } catch (e) {
      logger.error(e);
      return next(e);
    }
  };

  static deleteReply: RequestHandler = async (req, res, next) => {
    const replyId = Number(req.params.id);

    if (isNaN(replyId)) {
      return res.status(400).json({ message: 'Invalid reply ID' });
    }

    try {
      const deletedReply = await ReplyService.deleteReply(replyId);
      return res.status(200).json(deletedReply);
    } catch (e) {
      logger.error(e);
      return next(e);
    }
  };
}
