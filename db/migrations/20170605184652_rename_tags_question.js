
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('tags_question'),
    knex.schema.createTableIfNotExists('tags_questions', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('question_id').references('questions.id').onDelete('CASCADE');
      table.integer('tags_id').references('tags.id').onDelete('CASCADE');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('tags_questions'), 
    knex.schema.createTableIfNotExists('tags_question', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('question_id').references('questions.id').onDelete('CASCADE');
      table.integer('tags_id').references('tags.id').onDelete('CASCADE');
    })
  ])
};
