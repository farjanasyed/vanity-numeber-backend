#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { VanityNumbersBackendStack } from '../src/vanity-numbers-backend-stack';

const app = new cdk.App();
const AWS_REGION = 'us-east-1';
const AWS_SANDBOX_ACCOUNT = '815348399422';

new VanityNumbersBackendStack(app, 'VanityNumbersBackendStack-prod',{
  env: { region: AWS_REGION, account: AWS_SANDBOX_ACCOUNT },
  isDev: false,
  domainName: 'vanity-number.com',
});