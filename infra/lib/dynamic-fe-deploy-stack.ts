import * as cdk from '@aws-cdk/core';
import { config } from 'dotenv';
config();
import { join } from 'path';

import * as agw from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as r53 from '@aws-cdk/aws-route53';
import * as r53targets from '@aws-cdk/aws-route53-targets';
import * as ecr from '@aws-cdk/aws-ecr';

// import * as secrets from '@aws-cdk/aws-secretsmanager';


export class DynamicFrontEndStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    // LambdaLayers way
    // similar to the API
    //
    // const webApp = new lambda.Function(this, 'WebAppLambda', {
    //   runtime: lambda.Runtime.NODEJS_14_X,
    //   handler: 'src/lambda.handler',
    //   code: lambda.Code.fromAsset(join(__dirname, '../../bulldog-store/dynamic-page-frontend')),      
    //   tracing: lambda.Tracing.ACTIVE,
    //   memorySize: 1000,
    //   environment: {
    //     NODE_ENV: 'production'
    //   }
    // })

    const dynamicPageServerRepo = ecr.Repository.fromRepositoryName(this, 'DynamicPagesRepo', 'dynamic-page-server');

    const environment = {
      NODE_ENV: 'production',
      API_URL: 'https://bulldog-api.jaystack.codes',
    };

    const webApp = new lambda.DockerImageFunction(this, 'WebAppLambda2', {
      code: lambda.DockerImageCode.fromEcr(dynamicPageServerRepo, {
        tag: 'latest',
      }),
      tracing: lambda.Tracing.ACTIVE,
      memorySize: 1000,
      environment,
    })    

    const domainName = 'bulldog-web.jaystack.codes';

    // SHARED ACROSS ALL ENVS
    const zoneName = 'jaystack.codes';
    const hostedZoneId = 'Z039241626P523CPXXVO';
    const zone = r53.HostedZone.fromHostedZoneAttributes(this, 'JayStackCodesZone', { hostedZoneId, zoneName  })

    // SPECIFIC TO DEPLOY REGION
    const devDomainCertArn = 'arn:aws:acm:eu-west-1:511712716284:certificate/45793209-1962-4b75-8f03-82e4b867deb5';
    const certificate = acm.Certificate.fromCertificateArn(this, 'DevDomainCert', devDomainCertArn );
      
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

  }
}
