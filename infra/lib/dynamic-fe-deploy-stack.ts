import * as cdk from '@aws-cdk/core';
import { config } from 'dotenv';
config();
import { join } from 'path';

import * as agw from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as r53 from '@aws-cdk/aws-route53';
import * as r53targets from '@aws-cdk/aws-route53-targets';

// import * as secrets from '@aws-cdk/aws-secretsmanager';


export class DynamicFrontEndStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // SHARED ACROSS ALL ENVS
    const zoneName = 'jaystack.codes';
    const hostedZoneId = 'Z039241626P523CPXXVO';
    const zone = r53.HostedZone.fromHostedZoneAttributes(this, 'JayStackCodesZone', { hostedZoneId, zoneName  })

    // SPECIFIC TO DEPLOY REGION
    const devDomainCertArn = 'arn:aws:acm:eu-west-1:511712716284:certificate/45793209-1962-4b75-8f03-82e4b867deb5';
    const certificate = acm.Certificate.fromCertificateArn(this, 'DevDomainCert', devDomainCertArn );
  
    

    const webApp = new lambda.Function(this, 'WebAppLambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'src/lambda.handler',
      code: lambda.Code.fromAsset(join(__dirname, '../../bulldog-store/dynamic-page-frontend')),      
      tracing: lambda.Tracing.ACTIVE,
      memorySize: 1000,
      environment: {
        NODE_ENV: 'production'
      }
    })

    const domainName = 'bulldog-web.jaystack.codes';

    const webAppGateway = new agw.LambdaRestApi(this, 'WebAppAPP', {
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

    new r53.ARecord(this, 'BulldogDynamicFrontend', {
      recordName: domainName,
      comment: 'Rent A Bulldog NextJS Web App',
      zone,
      target: r53.RecordTarget.fromAlias(new r53targets.ApiGateway(webAppGateway))
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
