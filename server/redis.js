const redis = require('redis');
const Promise = require('bluebird');
Promise.promisifyAll(require('redis'));

const client = redis.createClient({
  host: process.env.REDIS_HOST || '127.0.0.1'
});

client.on('connect', () => {
  console.log("redis connected");
})

module.exports = client;