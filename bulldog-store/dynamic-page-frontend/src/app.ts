// We want to log to console on success or error of starting the server.
/* eslint-disable no-console */

import nextJs  from 'next';
import express from 'express';
import bodyParser from 'body-parser';

const fs = require('fs');

// const basePath = process.env.NODE_ENV === 'production' ? '' : '';
const dev = process.env.NODE_ENV !== 'production';
const app = nextJs({ dev });

const handle = app.getRequestHandler();
// const dir = fs.readdirSync('.');
console.log('local server!!!!', { isDev: !!dev} );
export const server = express();

app
  .prepare()
  .then(() => {

    server.all(
      '*',
      (req, res, next) => {
        console.log('SERVER', req.path);
        next()
      },
      <any>handle
    );
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
