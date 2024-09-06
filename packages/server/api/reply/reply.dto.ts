import { z } from 'zod';

export const createReplyDto = z.object({
  content: z
    .string()
    .min(1, 'Reply content must be at least 1 character long')
    .max(600, 'Reply content must be at most 600 characters long'),
  commentId: z.number().positive('Invalid comment ID'),
});

export type CreateReplyDto = z.infer<typeof createReplyDto>;
