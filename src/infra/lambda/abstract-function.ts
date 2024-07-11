import { Duration } from "aws-cdk-lib";
import { Role } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";

type AbstractFunctionProps = {
  entry: string;
  environment: { [key: string]: string };
  role: Role;
  domainName: string;
  isDev: boolean;
  memorySize?: number;
  timeout?: Duration;
  reservedConcurrentExecutions?: number;
};

export class AbstractFunction extends NodejsFunction {
  constructor(
    scope: Construct,
    functionName: string,
    props: AbstractFunctionProps
  ) {
    super(scope, functionName, {
      runtime: Runtime.NODEJS_18_X,
      logRetention: RetentionDays.ONE_MONTH,
      role: props.role,
      memorySize: props.memorySize,
      entry : props.entry,
      timeout: props.timeout || Duration.seconds(29),
      environment: Object.assign({}, props.environment),
      reservedConcurrentExecutions: props.reservedConcurrentExecutions,
    });
  }
}
