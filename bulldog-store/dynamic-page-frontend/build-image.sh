#! /bin/bash
echo '>> building dynamic pages server image'

aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 511712716284.dkr.ecr.eu-west-1.amazonaws.com
docker build -t dynamic-page-server . -f serverless.Dockerfile
docker tag dynamic-page-server:latest 511712716284.dkr.ecr.eu-west-1.amazonaws.com/dynamic-page-server:latest
docker push 511712716284.dkr.ecr.eu-west-1.amazonaws.com/dynamic-page-server:latest