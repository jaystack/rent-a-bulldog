import * as cdk from '@aws-cdk/core';
import { config } from 'dotenv';
config();
import { join } from 'path';

import * as agw from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdaN from '@aws-cdk/aws-lambda-nodejs';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as r53 from '@aws-cdk/aws-route53';
import * as r53targets from '@aws-cdk/aws-route53-targets';

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
    
    const apiLambda = new lambdaN.NodejsFunction(this, 'ApiLambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      entry: join(__dirname, '../../bulldog-store/api/src/lambda.ts'),
      environment: {
        CONTENTFUL_SPACE,
        CONTENTFUL_ACCESS_TOKEN,
      },
    });

    const domainName = 'bulldog-api.jaystack.codes';

    // SHARED ACROSS ALL ENVS
    const zoneName = 'jaystack.codes';
    const hostedZoneId = 'Z039241626P523CPXXVO';
    const zone = r53.HostedZone.fromHostedZoneAttributes(this, 'JayStackCodesZone', { hostedZoneId, zoneName  })

    // SPECIFIC TO DEPLOY REGION
    const devDomainCertArn = 'arn:aws:acm:eu-west-1:511712716284:certificate/45793209-1962-4b75-8f03-82e4b867deb5';
    const certificate = acm.Certificate.fromCertificateArn(this, 'DevDomainCert', devDomainCertArn );
    
    const lambdaRestApi = new agw.LambdaRestApi(this, 'LambdaRestApi', {
      handler: apiLambda,
      endpointTypes: [agw.EndpointType.REGIONAL],
      domainName: {
        domainName,
        certificate: certificate,
        endpointType: agw.EndpointType.REGIONAL,
      },      
      deployOptions: {
        tracingEnabled: true,
        loggingLevel: agw.MethodLoggingLevel.INFO,
      },
    });

    new r53.ARecord(this, 'BulldogAPI', {
      recordName: domainName,
      comment: 'Rent A Bulldog Express API',
      zone,
      target: r53.RecordTarget.fromAlias(new r53targets.ApiGateway(lambdaRestApi))
    });

    // new cdk.CfnOutput(this, 'RestApiId', {
    //   value: lambdaRestApi.restApiId,
    //   description: 'my api',
    // });

    // new cdk.CfnOutput(this, 'ApiUrl', {
    //   // value: lambdaRestApi.restApiId,\
    //   value: `https://${lambdaRestApi.restApiId}.execute-api.${this.region}.amazonaws.com/${lambdaRestApi.deploymentStage.stageName}`,
    // });
  }
}
