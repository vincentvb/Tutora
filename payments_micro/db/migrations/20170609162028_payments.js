
exports.up = function(knex, Promise) {
  return Promise.all([
  	knex.schema.createTableIfNotExists('balances', function (table) {
  		table.increments('id').unsigned().primary();
  		table.string('user_id').nullable();
  		table.integer('funds').nullable();
  	})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTable('balances')
	]);
};
