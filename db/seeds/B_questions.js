const models = require('../models');
const knex = require('knex')(require('../../knexfile'));
const db = require('bookshelf')(knex);

exports.seed = function(knex, Promise) {
  return knex('questions').del()
  .then(function() {
    return knex('questions').insert([{
      title: 'American History',
      body: 'Who was the founding fathers? Why no founding mothers? I need some clarification.',
      profile_id: 10,
      image: 'www.testimage.com',
      status: false
    }]);
  })
  .then(function() {
    return knex('questions').insert([{
      title: '5th grade algebra',
      body: 'I really need some help actually. I am going crazy.',
      profile_id: 10,
      image: 'www.testimage.com',
      status: false
    }]);
  })
  .then(function() {
    return knex('questions').insert([{
      title: 'Super interested in the Swedish Era of Great Power',
      body: 'What is it about this world nation that makes it so powerfull? Any smart Swedes that can lecture me?',
      profile_id: 10,
      image: 'www.testimage.com',
      status: false
    }]);
  })
  .then(function() {
    return knex('questions').insert([{
      title: 'What is rat?',
      body: 'I hear someone mention it. Biologi 101.',
      profile_id: 10,
      image: 'www.testimage.com',
      status: false
    }]);
  })
  .catch((error) => {
    console.log(error);
  });
};
