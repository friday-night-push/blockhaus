import type { RequestHandler } from 'express';
import {
  createProxyMiddleware,
  responseInterceptor,
} from 'http-proxy-middleware';

import { YANDEX_API_URL } from '../config';
import { logger } from '../utils';

export const yaProxyMiddleware: RequestHandler = (req, res, next) => {
  const proxy = createProxyMiddleware({
    target: YANDEX_API_URL,
    changeOrigin: true,
    logger: logger,
    cookieDomainRewrite: { '*': req.hostname },
    selfHandleResponse: true,
    on: {
      proxyRes: responseInterceptor(async (responseBuffer, proxyRes) => {
        if (req.url.includes('auth/user') && req.method === 'GET') {
          if (proxyRes.statusCode === 200) {
            const response = responseBuffer.toString('utf8');
            try {
              const user = JSON.parse(response);
              console.log(user);
            } catch (error) {
              logger.error(error);
            }
          }
        }
        return responseBuffer;
      }),
    },
  });

  return proxy(req, res, next);
};
