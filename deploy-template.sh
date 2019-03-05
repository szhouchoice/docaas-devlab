#!/bin/bash

export BUCKET=docaas-summit
export REGION=ap-southeast-2
export STACK=docaas-summit

# aws s3 cp cognito.yaml s3://docaas-summit
# aws cloudformation delete-stack --stack-name $STACK
# aws cloudformation wait stack-delete-complete --stack-name $STACK

sam package --template-file backend/template.yaml --s3-bucket $BUCKET --output-template-file backend/packaged.yaml --region $REGION
sam deploy --template-file backend/packaged.yaml --stack-name $STACK --capabilities CAPABILITY_NAMED_IAM --region $REGION

rm -f backend/packaged.yaml
