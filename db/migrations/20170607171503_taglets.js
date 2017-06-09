
exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.createTableIfNotExists('taglets', function (table) {
      table.increments('id').unsigned().primary();
      table.string('value', 300).nullable().unique();
      table.integer('tag_id').references('tags.id').onDelete('CASCADE');
    }),
  knex.schema.createTableIfNotExists('taglets_questions', function(table){
      table.increments('id').unsigned().primary();
      table.integer('question_id').references('questions.id').onDelete('CASCADE');
      table.integer('taglet_id').references('taglets.id').onDelete('CASCADE');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('taglets_questions'), 
    knex.schema.dropTable('taglets')
  ])
};
