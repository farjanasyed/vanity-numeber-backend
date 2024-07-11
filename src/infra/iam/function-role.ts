import { Duration, Stack } from "aws-cdk-lib";
import { ManagedPolicy, PolicyDocument, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export abstract class FunctionRole extends Role {
  constructor(scope: Construct, name: string) {
    super(scope, `${name}`, {
      roleName: `${name}`,
      maxSessionDuration: Duration.hours(1),
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
    });
    const policyDocument = {
        Version : '2012-10-17',
        Statement : [
            {
                Effect: 'Allow',
                Action: [
                  'logs:CreateLogGroup',
                  'logs:CreateLogStream',
                  'logs:PutLogEvents',
                ],
                Resource: `arn:aws:logs:${Stack.of(scope).region}:${
                  Stack.of(scope).account
                }:log-group:/aws/lambda/${name}:*`,
              }
        ]
    }

    const policy = new ManagedPolicy(this, `${name}CommonFunctionPolicyName`,{
        document : PolicyDocument.fromJson(policyDocument)
    })
    policy.attachToRole(this);
    this.addManagedPolicy(
        ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaVPCAccessExecutionRole')
    )
  }
}
