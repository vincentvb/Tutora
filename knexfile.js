const config = require('config');

if (process.env.DOCKER === 'isTrue') {
	module.exports = {
    "client": "postgresql",
    "connection": {
      "database": "thesis",
      "user": "postgres",
      "password": "postgres",
      "host": "db",
      "port": 5432
    },
    "pool": {
      "min": 1,
      "max": 2
    },
    "migrations": {
      "tableName": "knex_migrations",
      "directory": "db/migrations"
    },
    "seeds": {
      "directory": "db/seeds"
    }
  };
} else {
	module.exports = config['knex'];
}



// So I was trying to follow the set up from the
// github page I am on in the browser.
// Apparently there is supposed to be a bunch of
// env variables that I should be able to connect on.