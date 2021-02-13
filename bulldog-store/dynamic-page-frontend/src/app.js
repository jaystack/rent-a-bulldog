// We want to log to console on success or error of starting the server.
/* eslint-disable no-console */

const nextJs = require('next');
const express = require('express');

// const basePath = process.env.NODE_ENV === 'production' ? '' : '';
const dev = process.env.NODE_ENV !== 'production';
const app = nextJs({ dev });

const handle = app.getRequestHandler();
// const dir = fs.readdirSync('.');
console.log('local server!!!!', { isDev: !!dev });
const server = express();

app
  .prepare()
  .then(() => {

    server.all(
      '*',
      (req, res, next) => {
        console.log('SERVER', req.path);
        next()
      },
      handle
    );
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });


module.exports = {
  server
}