import type { RequestHandler } from 'express';

import { createReplyDto } from './reply.dto';
import { ReplyService } from './reply.service';

export class ReplyController {
  static createReply: RequestHandler = async (req, res, next) => {
    const user = res.locals.user;
    const commentId = Number(req.params.commentId);
    const validation = createReplyDto.safeParse({
      userId: user.id,
      commentId,
      ...req.body,
    });

    if (!validation.success) {
      return res.status(400).json({ reason: validation.error.errors });
    }

    try {
      const reply = await ReplyService.createReply(validation.data);
      return res.status(201).json(reply);
    } catch (e) {
      return next(e);
    }
  };

  static getRepliesByCommendId: RequestHandler = async (req, res, next) => {
    const validation = createReplyDto.pick({ commentId: true }).safeParse({
      commentId: Number(req.params.commentId),
    });

    if (!validation.success) {
      return res.status(400).json({ reason: validation.error.errors });
    }

    try {
      const replies = await ReplyService.getRepliesByCommentId(
        validation.data.commentId
      );
      return res.status(200).json(replies);
    } catch (e) {
      return next(e);
    }
  };

  static getReply: RequestHandler = async (req, res, next) => {
    const replyId = Number(req.params.id);

    if (isNaN(replyId)) {
      return res.status(400).json({ reason: 'Invalid reply ID' });
    }

    try {
      const reply = await ReplyService.getReply(replyId);
      return res.status(200).json(reply);
    } catch (e) {
      return next(e);
    }
  };

  static updateReply: RequestHandler = async (req, res, next) => {
    const replyId = Number(req.params.id);
    const validation = createReplyDto.partial().safeParse(req.body);

    if (isNaN(replyId)) {
      return res.status(400).json({ reason: 'Invalid reply ID' });
    }

    if (!validation.success) {
      return res.status(400).json({ reason: validation.error.errors });
    }

    try {
      const updatedReply = await ReplyService.updateReply(replyId, req.body);
      return res.status(200).json(updatedReply);
    } catch (e) {
      return next(e);
    }
  };

  static deleteReply: RequestHandler = async (req, res, next) => {
    const replyId = Number(req.params.id);

    if (isNaN(replyId)) {
      return res.status(400).json({ reason: 'Invalid reply ID' });
    }

    try {
      const deletedReply = await ReplyService.deleteReply(replyId);
      return res.status(200).json(deletedReply);
    } catch (e) {
      return next(e);
    }
  };
}
