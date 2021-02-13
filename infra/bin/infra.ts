#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { InfraBaseStack } from '../lib/infra-base-stack';
import { ApiStack } from '../lib/api-stack';
import { StaticFrontendStack } from '../lib/static-fe-build-stack';

const app = new cdk.App();
const base = new InfraBaseStack(app, 'InfraBaseStack');
new ApiStack(app, 'ApiStack');
new StaticFrontendStack(app, 'StaticFrontendStack', {
  vpc: base.vpc,
});
