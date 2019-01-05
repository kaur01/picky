import {enableProdMode} from '@angular/core';
import * as express from 'express';
import * as compression from 'compression';
import * as https from 'https';
import * as path from 'path';

enableProdMode();

const PORT = 4100;

const app = express();

app.set('views', 'src');

app.use(compression());
app.use((req, res, next) => {
  const oneYearInSeconds = '31536000';
  const hstsHeaderName = 'Strict-Transport-Security';
  const hstsHeaderValue = `max-age=${oneYearInSeconds}; includeSubDomains; preload`;
  res.setHeader(hstsHeaderName, hstsHeaderValue);
  next();
});
app.use('/', express.static(path.resolve(process.cwd(), 'dist/')));


const server = https.createServer( app);

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}!`);
});
