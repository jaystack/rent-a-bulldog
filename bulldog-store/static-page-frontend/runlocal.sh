docker run \
 -e AWS_ACCESS_KEY_ID=`aws configure get aws_access_key_id` \
 -e AWS_SECRET_ACCESS_KEY=`aws configure get aws_secret_access_key` \
 -e AWS_DEFAULT_REGION=`aws configure get region` \
 -t --rm static-pages-generator:latest