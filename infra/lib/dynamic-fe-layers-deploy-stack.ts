import * as cdk from '@aws-cdk/core';
import { config } from 'dotenv';
config();
import { join } from 'path';

import * as agw from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as r53 from '@aws-cdk/aws-route53';
import * as r53targets from '@aws-cdk/aws-route53-targets';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
export class FrontEndLayersStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const environment = {
      NODE_ENV: 'production',
      API_URL: 'https://bulldog-api.jaystack.codes',
    };

    const appBucket = new s3.Bucket(this, 'LayerStaticBucket', {
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
    });

    const deployStaticFile = new s3deploy.BucketDeployment(this, 'deploy', {
      sources: [s3deploy.Source.asset(join(__dirname, '../../bulldog-store/dynamic-page-frontend/.next'))],
      destinationBucket: appBucket,
    })
    
    const webApp = new lambda.Function(this, 'LayerAppLambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'src/lambda.handler',
      code: lambda.Code.fromAsset(join(__dirname, '../../bulldog-store/dynamic-page-frontend')),      
      tracing: lambda.Tracing.ACTIVE,
      memorySize: 1000,
      environment,
    })
    const domainName = 'bulldog-web-layers.jaystack.codes';

    // SHARED ACROSS ALL ENVS
    const zoneName = 'jaystack.codes';
    const hostedZoneId = 'Z039241626P523CPXXVO';
    const zone = r53.HostedZone.fromHostedZoneAttributes(this, 'JayStackCodesZone', { hostedZoneId, zoneName  })

    // SPECIFIC TO DEPLOY REGION
    const devDomainCertArn = 'arn:aws:acm:eu-west-1:511712716284:certificate/45793209-1962-4b75-8f03-82e4b867deb5';
    const certificate = acm.Certificate.fromCertificateArn(this, 'DevDomainCert', devDomainCertArn );
      
    const webAppGateway = new agw.LambdaRestApi(this, 'WebAppAPPLayers', {
      handler: webApp,
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

    new r53.ARecord(this, 'LayersDynamicFrontend', {
      recordName: domainName,
      comment: 'Rent A Bulldog NextJS Web App',
      zone,
      target: r53.RecordTarget.fromAlias(new r53targets.ApiGateway(webAppGateway))
    });

  }
}
