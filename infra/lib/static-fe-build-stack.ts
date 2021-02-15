import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ecsp from '@aws-cdk/aws-ecs-patterns';
import * as aas from '@aws-cdk/aws-applicationautoscaling';
import * as ecr from '@aws-cdk/aws-ecr';
import * as ecra from '@aws-cdk/aws-ecr-assets';
import * as ec2 from '@aws-cdk/aws-ec2';

import { join } from 'path';

export interface StaticFrontendStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
}

export class StaticFrontendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: StaticFrontendStackProps) {
    super(scope, id, props);

    const appBucket = new s3.Bucket(this, 'AppBucket', {
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
    });

    const pageGeneratorRepo = ecr.Repository.fromRepositoryName(this, "PageGeneratorRepo", "static-page-generator");

    const scheduledTask = new ecsp.ScheduledFargateTask(this, 'ScheduledBuildTask', {
      schedule: aas.Schedule.rate(cdk.Duration.minutes(30)),
      scheduledFargateTaskImageOptions: {
        image: ecs.ContainerImage.fromEcrRepository(pageGeneratorRepo, "latest"),
        cpu: 1024,
        memoryLimitMiB: 4096,
        environment: {
          S3_BUCKET: appBucket.bucketName,
          S3_PREFIX: '',
          API_URL: 'https://bulldog-api.jaystack.codes',
        },
      },
      vpc: props.vpc,
      subnetSelection: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
    });

    appBucket.grantReadWrite(scheduledTask.taskDefinition.taskRole);
  }
}
