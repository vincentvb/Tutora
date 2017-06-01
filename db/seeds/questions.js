const models = require('../models');

exports.seed = function(knex, Promise) {

  // // Deletes ALL existing entries
  // return knex('table_name').del()
  //   .then(function () {
  //     // Inserts seed entries
  //     return knex('table_name').insert([
  //       {id: 1, colName: 'rowValue1'},
  //       {id: 2, colName: 'rowValue2'},
  //       {id: 3, colName: 'rowValue3'}
  //     ]);
  //   });



  return models.Question.forge({
    title: '5th grade algebra',
    body: 'I really need some help actually. I am going crazy.',
    profile_id: 1,
    image: 'www.testimage.com'
  }).save()
  .then(() => {
    return models.Question.forge({
      title: 'American History',
      body: 'Who was the founding fathers? Why no founding mothers? I need some clarification.',
      profile_id: 1,
      image: 'www.testimage.com'
    }).save()
  })
  .catch((error) => {
    console.log(error);
  })

};
