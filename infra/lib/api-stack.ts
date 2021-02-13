import * as cdk from '@aws-cdk/core';
import { config } from 'dotenv';
config();
import { join } from 'path';

import * as agw from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdaN from '@aws-cdk/aws-lambda-nodejs';
// import * as secrets from '@aws-cdk/aws-secretsmanager';

const { CONTENTFUL_SPACE, CONTENTFUL_ACCESS_TOKEN } = process.env as {
  CONTENTFUL_SPACE: string;
  CONTENTFUL_ACCESS_TOKEN: string;
};

if (!CONTENTFUL_ACCESS_TOKEN || !CONTENTFUL_SPACE) {
  throw new Error('Missing Contentful credentials!');
}

export class ApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // const secret = new secrets.Secret(this, 'apiSecrets', {});

    const apiLambda = new lambdaN.NodejsFunction(this, 'ApiLambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      entry: join(__dirname, '../../bulldog-store/api/src/lambda.ts'),
      depsLockFilePath: join(__dirname, '../../bulldog-store/api/package-lock.json'),
      bundling: {},
      environment: {
        CONTENTFUL_SPACE,
        CONTENTFUL_ACCESS_TOKEN,
      },
    });

    const lambdaRestApi = new agw.LambdaRestApi(this, 'LambdaRestApi', {
      handler: apiLambda,
    });

    new cdk.CfnOutput(this, 'RestApiId', {
      value: lambdaRestApi.restApiId,
    });

    new cdk.CfnOutput(this, 'ApiUrl', {
      // value: lambdaRestApi.restApiId,\
      value: `https://${lambdaRestApi.restApiId}.execute-api.${this.region}.amazonaws.com/${lambdaRestApi.deploymentStage.stageName}`,
    });
  }
}
