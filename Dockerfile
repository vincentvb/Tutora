# FROM node:boron

# # Download nodemon for development
# RUN npm install --global nodemon
# RUN npm install webpack -g
# RUN npm install babel -g
# RUN npm install knex -g

# # Create app directory
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

# # Install App Dependencies
# COPY package.json /usr/src/app/

# RUN npm install

# # WEBPACK
# # RUN npm run compile

# # POSTGRES
# RUN npm run migrateDB
# RUN npm run seedDB

# # Bundle app source
# COPY . /usr/src/app

# # Creates a mount point
# VOLUME [ "/usr/src/app" ]

# EXPOSE 3000
# CMD ["npm", "start"]

FROM node:6.10.3-alpine

RUN mkdir -p /code
WORKDIR /code
ADD . /code

RUN apk add --no-cache git
RUN npm install -g yarn
RUN npm install -g nodemon
RUN npm install webpack -g
RUN npm install babel -g
RUN npm install knex -g

RUN yarn
RUN yarn global add grunt-cli knex

# WEBPACK
RUN npm run compile

# POSTGRES
# RUN npm run migrateDB
# RUN npm run seedDB

CMD ["npm", "start"]
EXPOSE 3000