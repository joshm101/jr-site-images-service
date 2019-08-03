FROM node:8.11.3

# Create app diretory
WORKDIR ./app

# Copies project source from host into container's working
# directory and installs project dependencies
COPY . ./

RUN npm install

# Bundle app source
COPY . .

CMD ["npm", "start"]
