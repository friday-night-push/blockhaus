import { z } from 'zod';

export const createCommentDto = z.object({
  topicId: z.number().positive('Invalid topic ID'),
  content: z
    .string()
    .min(1, 'Comment content must be at least 1 character long')
    .max(600, 'Comment content must be at most 600 characters long'),
});

export type CreateCommentDto = z.infer<typeof createCommentDto>;
