#! /bin/bash

echo '>> Next.js Build'
npm run build
ls -lah .
ls -lah ./.next
echo '>> Next.js Export'
npm run export
echo '>> S3 sync'
aws s3 sync --delete /app/out s3://${S3_BUCKET}${S3_PREFIX}
