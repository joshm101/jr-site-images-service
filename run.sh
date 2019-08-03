./stop-container.sh
docker build -t jr-site-images-service .

docker run \
--env JR_SITE_S3_BUCKET_NAME=${JR_SITE_S3_BUCKET_NAME} \
--env JR_SITE_AWS_ACCESS_KEY_ID=${JR_SITE_AWS_ACCESS_KEY_ID} \
--env JR_SITE_AWS_SECRET_ACCESS_KEY=${JR_SITE_AWS_SECRET_ACCESS_KEY} \
-p 3010:3010 -d --name jr-site-images-service-container jr-site-images-service

docker logs -f jr-site-images-service-container
