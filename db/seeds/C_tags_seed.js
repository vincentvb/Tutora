const models = require('../models');
const knex = require('knex')(require('../../knexfile'));
const db = require('bookshelf')(knex);

exports.seed = function(knex, Promise) {
  return knex('tags').del()
  .then(function() {
    return knex('tags').insert([{
      value: "Math", 
      id: 1
    }]);
  })
  .then(function() {
    return knex('tags').insert([{
      value: "Geography", 
      id: 2
    }]);
  })
  .then(function() {
    return knex('tags').insert([{
      value: "History", 
      id: 3
    }]);
  })
  .then(function() {
    return knex('tags').insert([{
      value: "Art", 
      id: 4
    }]);
  })
  .then(function() {
    return knex('tags').insert([{
      value: "Physics", 
      id: 5
    }]);
  })
  .then(function() {
    return knex('tags').insert([{
      value: "Chemistry", 
      id: 6
    }]);
  })
  .then(function() {
    return knex('tags').insert([{
      value: "Grammar", 
      id: 7
    }]);
  })
  .then(function() {
    return knex('tags').insert([{
      value: "English", 
      id: 8
    }]);
  })
  .then(function() {
    return knex('tags').insert([{
      value: "Biology", 
      id: 9
    }]);
  })
  .catch((error) => {
    console.log(error);
  });
};