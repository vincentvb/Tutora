const models = require('../models');
const knex = require('knex')(require('../../knexfile'));
const db = require('bookshelf')(knex);

exports.seed = function (knex, Promise) {
  return knex('profiles').del()
  .then(function() {
    return knex('auths').del()
  })
  .then(function() {
    return knex('profiles').insert([{
      first: 'System',
      last: 'Admin',
      display: 'Administrator',
      email: 'admin@domain.com',
      type: 'tutor',
      avatar: 'www.google.com',
      id: 10
    }]);
  })
  .then(function() {
    return knex('auths').insert([{
      type: 'local',
      password: 'admin123',
      profile_id: 10
    }]);
  })
  .catch((error) => {
    console.log(error);
  });
};
