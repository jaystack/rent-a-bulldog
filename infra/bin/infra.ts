#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { InfraBaseStack } from '../lib/infra-base-stack';
import { ApiStack } from '../lib/api-stack';
import { StaticFrontendStack } from '../lib/static-fe-build-stack';

interface Dict<T> {
    [key: string]: T;
}

const ENVS: Dict<cdk.Environment> = {
    'default':   { account: '511712716284', region: 'eu-west-1' },
    'dev-ireland':   { account: '511712716284', region: 'eu-west-1' },
}

// const env = ENVS
const app = new cdk.App();
const base = new InfraBaseStack(app, 'InfraBaseStack');


new ApiStack(app, 'ApiStack', { 
    env: ENVS[process.env.AWS_ENV ?? 'default'],
});


// new StaticFrontendStack(app, 'StaticFrontendStack', {
//   vpc: base.vpc,
// });
