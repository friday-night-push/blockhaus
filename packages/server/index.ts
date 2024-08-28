import * as path from 'path';

import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { type ViteDevServer, createServer as createViteServer } from 'vite';

import { apiRouter } from './routes/api';
import { ssrRoute } from './routes/ssr';

import { isDev } from './utils';

// import { createClientAndConnect } from './db';

// createClientAndConnect();

async function startServer() {
  const app = express();
  const port = Number(process.env.SERVER_PORT) || 3001;

  app.use(cors());
  app.use('/api/v1', apiRouter);

  let vite: ViteDevServer | undefined;

  const distPath = path.dirname(require.resolve('client/dist/index.html'));
  const srcPath = path.dirname(require.resolve('client/index.html'));

  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')));
  }

  app.use('*', ssrRoute({ vite, distPath, srcPath }));

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

startServer();
