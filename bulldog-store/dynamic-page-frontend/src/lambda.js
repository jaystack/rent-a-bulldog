const lambdaexpress = require('aws-serverless-express');
const { server } = require('./app');
const lambdaserver = lambdaexpress.createServer(server);
exports.handler = (event, context) => {
    console.log(`Lambda Handler Invoke`, event);
    lambdaexpress.proxy(lambdaserver, event, context);
}