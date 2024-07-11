import { Construct } from "constructs";
import { FunctionRole } from "./function-role";
import { Version } from "aws-cdk-lib/aws-lambda";
import { Stack } from "aws-cdk-lib";
import { ManagedPolicy, PolicyDocument } from "aws-cdk-lib/aws-iam";


type VanityNumberFnRoleProps ={
    functionName: string;
    databaseName: string;
  }

export class VanityNumberCheckRole extends FunctionRole {
    constructor(scope : Construct,props : VanityNumberFnRoleProps){
        const name = "VanityNumberCheckRole"
        super(scope,name);
        const policyDocument = {
            Version :  '2012-10-17',
            Statement : [{
                    Effect: 'Allow',
                    Action: [
                      'dynamodb:PutItem',
                      'dynamodb:GetItem'
                    ],
                    Resource: [
                      `arn:aws:dynamodb:${Stack.of(this).region}:${
                        Stack.of(this).account
                      }:table/${props.databaseName}`
                    ]
            }]
        }

        const policy = new ManagedPolicy(this,'VanityNumberPolicy',{
             document : PolicyDocument.fromJson(policyDocument)
        })
        policy.attachToRole(this);
    }
}