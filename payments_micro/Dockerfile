FROM node:6.10.3-alpine

RUN mkdir -p /code
WORKDIR /code
ADD . /code

RUN apk add --no-cache git
RUN npm install -g yarn
RUN npm install -g nodemon
RUN npm install babel -g
RUN npm install knex -g

RUN yarn
RUN yarn global add grunt-cli knex

CMD ["npm", "start"]
EXPOSE 1337