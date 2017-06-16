(function () {
  'use strict';

  const esClient = require('./elasticsearch.js')

  const indices = function indices(){
    return esClient.cat.indices({v: true})
    .then(console.log)
    .catch(error => console.error(`Error connecting to the es client: ${err}`));
  }
  
  const test = function test(){
    console.log(`elasticsearch indices information:`);
    indices();
  };

  test()

  module.exports = { indices };

} ());
