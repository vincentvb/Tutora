FROM node:6.10.3-alpine

RUN mkdir -p /code
WORKDIR /code
ADD . /code

RUN apk add --no-cache git
RUN npm install -g yarn
RUN npm install -g nodemon

RUN yarn

CMD ["npm", "start"]
EXPOSE 3030