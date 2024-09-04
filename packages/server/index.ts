import * as path from 'path';

import compression from 'compression';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

import express from 'express';
import helmet from 'helmet';
import { type ViteDevServer, createServer as createViteServer } from 'vite';

import { apiRouter } from './api';
import { ssrRoute } from './ssr';

import { isDev, initPostgres, logger } from './utils';

initPostgres();

async function startServer() {
  const app = express();
  const port = Number(process.env.SERVER_PORT) || 3001;

  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use('/api/v1', apiRouter);

  let vite: ViteDevServer | undefined;

  const distPath = path.dirname(require.resolve('client/dist/index.html'));
  const srcPath = path.dirname(require.resolve('client/index.html'));

  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
      ssr: {
        noExternal: ['@gravity-ui/uikit'],
      },
    });
    app.use(vite.middlewares);
  } else {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')));
  }

  app.use('*', ssrRoute({ vite, distPath, srcPath }));

  app.listen(port, () => {
    logger.info(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

startServer();
