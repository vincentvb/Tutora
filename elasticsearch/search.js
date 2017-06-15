(function () {
  'use strict';

  const esClient = require('./elasticsearch.js')

  const search = function search(index, body){
    return esClient.search({ index: index, body: body })
  };

  const test = function test(){
    let body = {
      size: 20, 
      from: 0, 
      query: {
        // match_all: {}
        multi_match: {
          query: 'Caitlin',
          fields: ['title', 'body', 'tag_name', 'profiles.first', 'profiles.last', 'profiles.display'],
          fuzziness: 2
        }
      }
    }

    search('questions', body)
    .then(results => {
      // console.log(results.hits)
      console.log(`found ${results.hits.total} items in ${results.took}ms`);
      console.log(`returned question body:`);

      results.hits.hits.map(function(hit, index){
        console.log(
          `\t${body.from + ++index} - ${hit._source.profiles.first}`
          )
      }) 
    })
    .catch(console.error);
  };

  test();

  module.exports = { search };

} ());

// match: {
//           body: {
//             query: 'steroid',
//             minimum_should_match: 1,
//             fuzziness: 2
//           }
//         }