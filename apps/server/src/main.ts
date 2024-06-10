import express, { Express, Request, Response, NextFunction } from 'express';
import * as path from 'path';
import cors from 'cors';
import logger from './utils/logger';
import helmet from 'helmet';
import { fetchFrame } from 'node-iframe';
import proxy from 'express-http-proxy';

const app: Express = express();

app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Use Helmet but disable frameguard and content security policy
app.use(
  helmet({
    frameguard: false,
    contentSecurityPolicy: false,
  })
);

// Log all incoming requests except HEAD requests
app.use((req, res, next) => {
  if (req.method !== 'HEAD') {
    logger.info(`Incoming request: ${req.method} ${req.url}`);
  }
  next();
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to server!' });
});

// Proxy middleware
const proxyMiddleware = proxy('https://www.youtube.com', {
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    proxyReqOpts.headers['Access-Control-Allow-Origin'] = '*';
    proxyReqOpts.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    proxyReqOpts.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
    return proxyReqOpts;
  },
  proxyReqPathResolver: (req) => {
    return req.url;
  },
});

// Iframe route
app.get('/iframe', async (req: Request, res: Response) => {
  const url = req.query.url as string;

  try {
    const html = await fetchFrame({ url });
    res.send(html);
  } catch (error) {
    logger.error(`Error fetching iframe: ${error.message}`);
    res.status(500).send('Error fetching iframe');
  }
});

// Proxy route
app.use('/proxy', proxyMiddleware);

const port = process.env.PORT || 3333;
export const server = app.listen(port, () => {
  logger.info(`Listening at http://localhost:${port}/`);
});
server.on('error', (error) => logger.error(`Server error: ${error.message}`));

export default app;
