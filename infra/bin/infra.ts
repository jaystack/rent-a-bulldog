#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { InfraBaseStack } from '../lib/infra-base-stack';
import { ApiStack } from '../lib/api-stack';
import { StaticFrontendStack } from '../lib/static-fe-build-stack';
import { DynamicFrontEndStack } from '../lib/dynamic-fe-deploy-stack';

interface Dict<T> {
    [key: string]: T;
}

const ENVS: Dict<cdk.Environment> = {
    'default':   { account: '511712716284', region: 'eu-west-1' },
    'dev-eu-west-1':   { account: '511712716284', region: 'eu-west-1' },
}
const env = ENVS[process.env.AWS_ENV ?? 'default']

// const env = ENVS
const app = new cdk.App();
const base = new InfraBaseStack(app, 'InfraBaseStack', { env });


new ApiStack(app, 'ApiStack', { env });
new DynamicFrontEndStack(app,  'FrontEndStack', { env });
new StaticFrontendStack(app, 'StaticFrontendStack', {
    env,
    vpc: base.vpc,
});
