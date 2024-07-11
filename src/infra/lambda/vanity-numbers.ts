import { Duration } from "aws-cdk-lib";
import { Role } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";
import { AbstractFunction } from "./abstract-function";
import { VanityNumberCheckRole } from "../iam/vanity-number-role";

type VanityNumbersFnProps = {
    databaseName: string;
    domainName: string;
    isDev: boolean;
};

export class VanityNumbersFn extends AbstractFunction {
  constructor(
    scope: Construct,
    props: VanityNumbersFnProps
  ) {
    const functionName = "vanityNumberFn";
    super(scope,functionName,{
        entry : 'src/handlers/index.ts',
        environment: {},
        role : new VanityNumberCheckRole(scope,{
            functionName : functionName,
            databaseName : props.databaseName
        } ),
        domainName : props.domainName,
        isDev : props.isDev
    })
  }
}
