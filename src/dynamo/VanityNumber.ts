import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class VanityNumber extends Table{
    constructor(scope : Construct){

        super(scope,'VanityNumber',{
            tableName : 'VanityNumbers',
            partitionKey : {
                 name : 'callerNumber',
                 type : AttributeType.STRING
            },
            sortKey : {
                name : 'VariantNumber',
                type : AttributeType.STRING
            }
        })
         
    }
}