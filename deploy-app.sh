#!/bin/bash

export BUCKET=docaas-summit
export REGION=ap-southeast-2
export STACK=docaas-summit

# Grab bucket name from cloudformation output
BUCKET=$(aws cloudformation describe-stacks --stack-name $STACK --query 'Stacks[0].Outputs[?OutputKey==`TheBucket`].OutputValue' --output text)
echo $BUCKET

# Build app
cd frontend
npm install
npm run-script build
cd ..

# Copy front-end public files to bucket
aws s3 sync frontend/build/ "s3://$BUCKET"

