import querystring from 'querystring';

import type { Request, RequestHandler } from 'express';
import {
  createProxyMiddleware,
  responseInterceptor,
} from 'http-proxy-middleware';

import { UserModel } from '../api/user';
import { YANDEX_API_URL } from '../config';
import { logger } from '../utils';

/**
 * Middleware для проксирования запросов к API Яндекс.
 * Использует http-proxy-middleware для перенаправления запросов и перехвата ответов.
 * Если проксируемый запрос это запрос на 'auth/user' методом GET и ответ успешен (код 200),
 * извлекает данные пользователя и обновляет их в локальной базе данных.
 */
export const yaProxyMiddleware: RequestHandler = (req, res, next) => {
  const proxy = createProxyMiddleware({
    target: YANDEX_API_URL,
    changeOrigin: true,
    logger: logger,
    cookieDomainRewrite: { '*': req.hostname },
    selfHandleResponse: true,
    on: {
      /**
       * Этот callback вызывается перед отправкой запроса к API Яндекс.
       * Он позволяет модифицировать запрос, пересылая тело запроса в случае,
       * если `express.json()` уже прочитал тело запроса. https://github.com/chimurai/http-proxy-middleware/issues/320
       */
      proxyReq: async (proxyReq, req: Request) => {
        if (!req.body || !Object.keys(req.body).length) {
          return;
        }

        const contentType = proxyReq.getHeader('Content-Type');
        const writeBody = (bodyData: string) => {
          proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
          proxyReq.write(bodyData);
        };

        if (contentType === 'application/json') {
          // contentType.includes('application/json')
          writeBody(JSON.stringify(req.body));
        }

        if (contentType === 'application/x-www-form-urlencoded') {
          writeBody(querystring.stringify(req.body));
        }
      },
      /**
       * Перехватчик ответа от API Яндекс. Если это запрос 'auth/user', парсит ответ,
       * обновляет или вставляет пользователя в базу данных.
       */
      proxyRes: responseInterceptor(async (responseBuffer, proxyRes) => {
        if (req.url.includes('auth/user') && req.method === 'GET') {
          if (proxyRes.statusCode === 200) {
            const response = responseBuffer.toString('utf8');
            try {
              const user = JSON.parse(response);
              try {
                // Обновляем или вставляем запись о пользователе в базу данных
                await UserModel.upsert(user);
              } catch (error) {
                logger.error(error);
              }
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
