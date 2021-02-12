import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ecsp from '@aws-cdk/aws-ecs-patterns';
import * as aas from '@aws-cdk/aws-applicationautoscaling';
import * as ecra from '@aws-cdk/aws-ecr-assets';
import * as ec2 from '@aws-cdk/aws-ec2';

import { join } from 'path';

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'vpc', {
      natGateways: 0,
    });

    const appBucket = new s3.Bucket(this, 'AppBucket', {
      publicReadAccess: true,
    });

    const scheduledTask = new ecsp.ScheduledFargateTask(this, 'ScheduledBuildTask', {
      schedule: aas.Schedule.rate(cdk.Duration.minutes(5)),
      scheduledFargateTaskImageOptions: {
        image: ecs.ContainerImage.fromDockerImageAsset(
          new ecra.DockerImageAsset(this, 'BuildImage', {
            directory: join(__dirname, '../../bulldog-store/static-page-frontend'),
            file: 'fargate.Dockerfile',
          })
        ),
        // cpu: 4096,
        // memoryLimitMiB: 16384,
        cpu: 1024,
        memoryLimitMiB: 4096,
        environment: {
          S3_BUCKET: appBucket.bucketName,
          S3_PREFIX: '',
        },
      },
      vpc,
      subnetSelection: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      // scheduledFargateTaskDefinitionOptions: {
      //   taskDefinition: {

      //   }
      // }
    });

    appBucket.grantReadWrite(scheduledTask.taskDefinition.taskRole);
    // new lambda.DockerImageFunction(this, 'lambda', {
    //   code: lambda.DockerImageCode.fromImageAsset(join(__dirname, '../next-examples/with-static-export'), {
    //     file: 'lambda.Dockerfile',
    //     // target
    //   }),
    //   memorySize: 10240,
    //   timeout: cdk.Duration.minutes(15),
    // });
  }
}
