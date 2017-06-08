const models = require('../models');
const knex = require('knex')(require('../../knexfile'));
const db = require('bookshelf')(knex);

exports.seed = function(knex, Promise) {
  return knex('tags').del()
  .then(function() {
    return knex('tags').insert([{
      value: "Math"
    }]);
  })
  .then(function() {
    return knex('tags').insert([{
      value: "Geography"
    }]);
  })
  .then(function() {
    return knex('tags').insert([{
      value: "History"
    }]);
  })
  .then(function() {
    return knex('tags').insert([{
      value: "Art"
    }]);
  })
  .then(function() {
    return knex('tags').insert([{
      value: "Physics"
    }]);
  })
  .then(function() {
    return knex('tags').insert([{
      value: "Chemistry"
    }]);
  })
  .then(function() {
    return knex('tags').insert([{
      value: "Grammar"
    }]);
  })
  .then(function() {
    return knex('tags').insert([{
      value: "English"
    }]);
  })
  .then(function() {
    return knex('tags').insert([{
      value: "Biology"
    }]);
  })
  .catch((error) => {
    console.log(error);
  });
};