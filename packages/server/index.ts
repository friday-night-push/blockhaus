import * as fs from 'fs';
import * as path from 'path';

import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { type ViteDevServer, createServer as createViteServer } from 'vite';

import { apiRouter } from './routes/api';

// import { createClientAndConnect } from './db';

// createClientAndConnect();

const isDev = process.env.NODE_ENV === 'development';

interface SSR {
  render: (uri: string) => Promise<{ html: string }>;
}

async function startServer() {
  const app = express();
  const port = Number(process.env.SERVER_PORT) || 3001;

  let vite: ViteDevServer | undefined;

  const distPath = path.dirname(require.resolve('client/dist/index.html'));
  const srcPath = path.dirname(require.resolve('client/index.html'));
  const ssrPath = path.dirname(require.resolve('client/dist-ssr/ssr.cjs'));

  app.use(cors());
  app.use('/api/v1', apiRouter);

  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    });
    app.use(vite.middlewares);
  }

  if (!isDev) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')));
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    try {
      let template: string;
      let ssr: SSR;

      if (isDev) {
        template = fs.readFileSync(
          path.resolve(srcPath, 'index.html'),
          'utf-8'
        );
        // eslint-disable-next-line
        template = await vite!.transformIndexHtml(url, template);
        // eslint-disable-next-line
        ssr = (await vite!.ssrLoadModule(
          path.resolve(srcPath, 'ssr.tsx')
        )) as SSR;
      } else {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        );
        ssr = await import(ssrPath);
      }

      const { html } = await ssr.render(url);
      console.log(html);

      res
        .status(200)
        .set({ 'Content-Type': 'text/html' })
        .send(template.replace(`<!--ssr-outlet-->`, html));
    } catch (error) {
      if (isDev) {
        // eslint-disable-next-line
        vite!.ssrFixStacktrace(error as Error);
        next(error);
      }
    }
  });

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

startServer();
