// const esClient = require('./')
(function () {
  'use strict';

  const fs = require('fs');

  const esClient = require('./elasticsearch.js')
  // const elasticsearch = require('elasticsearch');
  // const esClient = new elasticsearch.Client({
  //   host: '127.0.0.1:9200', 
  //   log: 'error'
  // });



  const bulkIndex = function bulkIndex(index, type, data){
    console.log("HELLLLLLLLLO")

    let bulkBody = [];

    data.forEach(item =>{
      bulkBody.push({
        index: {
          _index: index, 
          _type: type, 
          _id: item.id
        }
      })
    
      bulkBody.push(item)
    })

    esClient.bulk({ body: bulkBody })
    .then(response => {
       let errorCount = 0;
       response.items.forEach(item => {
        if (item.index && item.index.error){
          console.log(++errorCount, item.index.error);
        }
       }) 

       console.log(`Successfully indexed ${data.length - errorCount} out of ${data.length} items`);
    })
    .catch(console.err)

  }

  // refactor to a queue + worker
  const test = function test(){
    const questionsRaw = fs.readFileSync('data.json');
    const questions = JSON.parse(questionsRaw);
    console.log(`${questions.length} items parsed from data file`);
    bulkIndex('questions', 'question', questions)
  }

  test();

  module.exports = { bulkIndex };

} ());


