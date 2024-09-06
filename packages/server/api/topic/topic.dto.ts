import { z } from 'zod';

export const createTopicDto = z.object({
  name: z
    .string()
    .min(1, 'Topic name must be at least 1 character long')
    .max(100, 'Topic name must be at most 100 characters long'),
});

export type CreateTopicDto = z.infer<typeof createTopicDto>;
