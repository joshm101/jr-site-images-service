FROM node:8.11.3

# Create app diretory
WORKDIR ./app

# Copies project source from host into container's working
# directory and installs project dependencies
# A wildcard is used to ensure both package.json and package-lock.json
# are copied where available (npm@5+)
COPY . ./

RUN npm install

# Bundle app source
COPY . .

CMD ["npm", "start"]
