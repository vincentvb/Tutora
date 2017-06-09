
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('questions', function(table) {
      table.string('status', 200).nullable();
      table.integer('feedback_rating', 10).nullable();
      table.integer('answerer_id', 2000).nullable();
      table.integer('tag_id').references('tags.id').onDelete('CASCADE');
      table.string('tag_name').nullable();
    }),


  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('questions', function(table){
      table.dropColumn('status');
      table.dropColumn('feedback_rating');
      table.dropColumn('answerer_id');
      table.dropColumn('tag_id');
      table.dropColumn('tag_name');
    })
  ])
};
