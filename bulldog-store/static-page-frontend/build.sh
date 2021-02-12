#! /bin/bash

echo '>> Next.js Build'
npx next build
echo '>> Next.js Export'
npx next export
echo '>> S3 sync'
aws s3 sync --delete /app/out s3://${S3_BUCKET}${S3_PREFIX}
