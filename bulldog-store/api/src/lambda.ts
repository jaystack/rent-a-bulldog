import slsExpress from 'aws-serverless-express';
import { Handler } from 'aws-lambda';
import { app } from './app';

const server = slsExpress.createServer(app);

export const handler: Handler = (event, context) => {
  slsExpress.proxy(server, event, context);
};
