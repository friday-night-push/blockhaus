import { z } from 'zod';

export const createReplyDto = z.object({
  content: z
    .string()
    .min(1, 'Reply content must be at least 1 character long')
    .max(600, 'Reply content must be at most 600 characters long'),
  commentId: z
    .number({ message: 'Invalid comment ID' })
    .positive('Comment ID must be positive'),
  userId: z
    .number({ message: 'Invalid user ID' })
    .positive('User ID must be positive'),
});

export type CreateReplyDto = z.infer<typeof createReplyDto>;
