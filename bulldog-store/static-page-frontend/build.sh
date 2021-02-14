#! /bin/bash
echo '>> Next.js Export'
npm run export
echo '>> S3 sync'
aws s3 ls
aws s3 sync --delete /app/out s3://${S3_BUCKET}${S3_PREFIX}
echo '>> Finished generating pages'
