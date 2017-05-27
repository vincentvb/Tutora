const knex = require('knex')(require('../knexfile'));
const db = require('bookshelf')(knex);

// const Bookshelf = require('../Bookshelf.js');

db.plugin('registry');

module.exports = db;

