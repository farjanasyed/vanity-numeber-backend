# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template


Overview

This project involves using AWS CDK to create an Amazon Connect instance and configure a contact flow. The process includes a Lambda function that handles the creation and deletion of the Amazon Connect instance and contact flow.

Components
AWS CDK: Infrastructure as code framework to define cloud resources.
Amazon Connect: Cloud-based contact center service.
AWS Lambda: Function to create and manage Amazon Connect resources.
Custom Resource: AWS CDK custom resource to trigger the Lambda function.
DynamoDB: Stores the vanity numbers and caller's phone number.
Workflow
Infrastructure Setup:

CDK deploys the stack which includes a Lambda function and a custom resource.
The custom resource triggers the Lambda function to create an Amazon Connect instance and contact flow.
Lambda Function:

The Lambda function uses AWS SDK v3 to create an Amazon Connect instance.
It then sets up a contact flow that plays a prompt with vanity numbers.
The instance ID and contact flow ID are returned to the custom resource.
Custom Resource:

The custom resource handles the creation and deletion of the Amazon Connect instance and contact flow based on lifecycle events (Create, Update, Delete).



Architecture Diagram


+-------------------+        +-----------------+         +--------------------------+
|                   |        |                 |         |                          |
|  User Initiates   |        |  AWS CDK        |         |  AWS Lambda Function     |
|  Stack Deployment |        |  Deploys Stack  |         |  Creates Amazon Connect  |
|                   +-------->  with Lambda    +--------->  Instance and Contact    |
|                   |        |  and Custom     |         |  Flow, Manages Lifecycle  |
|                   |        |  Resource       |         |                          |
+-------------------+        +-----------------+         +--------------------------+
                                  |                                      |
                                  |                                      |
                                  v                                      |
                            +-------------------+                        |
                            |                   |                        |
                            |  Custom Resource  |                        |
                            |  Triggers Lambda  |                        |
                            |  Function on      |                        |
                            |  Create/Delete    |                        |
                            +-------------------+                        |
                                  |                                      |
                                  v                                      |
                            +-------------------+                        |
                            |                   |                        |
                            |  Amazon Connect   |<-----------------------+
                            |  Instance &       |
                            |  Contact Flow     |
                            +-------------------+


Challenges Faced : 

1. Initially with the existing the aws account I was unable to create the Connect instance . Got to know we have to use USA  details as billing address tried with it works


Please use below url to check the contact flow

https://vanity-number-check.awsapps.com/auth/?client_id=212bb6c210155f1c&redirect_uri=https%3A%2F%2Fvanity-number-check.my.connect.aws%2Fauth%2Fcode%3Fdestination%3D%252Fhome&state=pumbY6ZI14LZeVBQZ8VR8PE6T-LC8Vd_rY1p5Ik0tohTeamviznh8PH7G4xpkb-xNUdRl2dY8V_aVp8LhVlcMg


