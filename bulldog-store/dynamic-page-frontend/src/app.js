// We want to log to console on success or error of starting the server.
/* eslint-disable no-console */

const nextJs = require('next');
const awsxray = require('aws-xray-sdk');
awsxray.captureHTTPsGlobal(require('https'), true);
awsxray.captureHTTPsGlobal(require('http'), true);

const express = require('express');

awsxray.capturePromise();

const dev = process.env.NODE_ENV !== 'production';
const app = nextJs({ dev });

const handle = app.getRequestHandler();
console.log('express server created', { isDev: !!dev });
const server = express();

app
  .prepare()
  .then(() => {
    server.use(awsxray.express.openSegment('website'));
    server.all(
      '*',
      (req, res, next) => {
        console.log('SERVER', req.path);
        next()
      },
      handle
    );
    server.use(awsxray.express.closeSegment());
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });


module.exports = {
  server
}