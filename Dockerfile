FROM node:boron

# Download nodemon for development
RUN npm install --global nodemon
RUN npm install webpack -g
RUN npm install babel -g
RUN npm install knex -g

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install App Dependencies
COPY package.json /usr/src/app/
RUN npm install
# RUN webpack --config webpack.config.babel.js

# # POSTGRES
# RUN knex migrate:latest --env development --knexfile app/db/migrations/20170326215143_initial.js
# RUN knex seed:run --env development --knexfile app/db/seeds

# Bundle app source
COPY . /usr/src/app

# ARG NODE_ENV
# ENV NODE_ENV $NODE_ENV

# Creates a mount point
VOLUME [ "/usr/src/app" ]

EXPOSE 3000
CMD ["npm", "start"]