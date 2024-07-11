import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import {VanityNumbersFn} from './infra/lambda/vanity-numbers'
import { StackProps } from 'aws-cdk-lib';
import { VanityNumber } from './dynamo/VanityNumber';
// import * as sqs from 'aws-cdk-lib/aws-sqs';


interface VanityNumbersBackendStackProps extends StackProps {
  domainName: string;
  isDev: boolean;
}

export class VanityNumbersBackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props:VanityNumbersBackendStackProps) {
    super(scope, id, props);
   const vanityTable =  new VanityNumber(this);

   
    new VanityNumbersFn(this,{
      databaseName : vanityTable.tableName,
      domainName : props.domainName,
      isDev : props.isDev
    })
  }
}

