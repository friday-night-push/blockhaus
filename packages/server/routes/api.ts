import { Router } from 'express';

export const apiRouter = Router();

apiRouter.get('/', (_, res) => {
  res.json('👋 Howdy from the API :)');
});
