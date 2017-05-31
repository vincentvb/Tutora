FROM node:boron

# Download nodemon for development
RUN npm install --global nodemon
RUN npm install webpack -g
RUN npm install babel -g

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install App Dependencies
COPY package.json /usr/src/app/
RUN npm install
# RUN webpack --config webpack.config.babel.js

# Bundle app source
COPY . /usr/src/app

# ARG NODE_ENV
# ENV NODE_ENV $NODE_ENV

EXPOSE 3000
CMD ["npm", "start"]