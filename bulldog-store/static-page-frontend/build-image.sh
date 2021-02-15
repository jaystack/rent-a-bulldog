#! /bin/bash
echo '>> building page generator image'

aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 511712716284.dkr.ecr.eu-west-1.amazonaws.com
docker build -t static-pages-generator . -f static-generator.Dockerfile
docker tag static-pages-generator:latest 511712716284.dkr.ecr.eu-west-1.amazonaws.com/static-page-generator:latest
docker push 511712716284.dkr.ecr.eu-west-1.amazonaws.com/static-page-generator:latest
