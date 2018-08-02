FROM node:8.11.3

# Create app diretory
WORKDIR ./app

# Install dependencies
# A wildcard is used to ensure both package.json and package-lock.json
# are copied where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

ARG JR_SITE_USERS_SERVICE_URI
ARG JR_SITE_S3_BUCKET_NAME
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY

ENV JR_SITE_USERS_SERVICE_URI=$JR_SITE_USERS_SERVICE_URI
ENV JR_SITE_S3_BUCKET_NAME=$JR_SITE_S3_BUCKET_NAME
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY

CMD ["npm", "start"]
