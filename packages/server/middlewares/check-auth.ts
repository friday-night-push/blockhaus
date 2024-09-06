import type { RequestHandler } from 'express';

import { YANDEX_API_URL } from '../config';
import { logger } from '../utils';

export const checkAuthMiddleware: RequestHandler = async (req, res, next) => {
  const cookie = req.headers.cookie;

  if (!cookie) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const response = await fetch(`${YANDEX_API_URL}/auth/user`, {
      headers: {
        Cookie: cookie,
      },
    });

    if (!response.ok) {
      return res.status(401).send('Unauthorized');
    }
  } catch (e) {
    logger.error(e);
    return res.status(500).send('Internal Server Error');
  }

  return next();
};
