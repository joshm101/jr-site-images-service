./stop-container.sh
docker build -t jr-site-images-service --build-arg JR_SITE_USERS_SERVICE_URI=${JR_SITE_USERS_SERVICE_URI} --build-arg JR_SITE_S3_BUCKET_NAME=${JR_SITE_S3_BUCKET_NAME} --build-arg AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} --build-arg AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} .
docker run -p 3010:3010 -d --name jr-site-images-service-container jr-site-images-service
docker logs -f jr-site-images-service-container
