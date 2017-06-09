

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('tags_questions', function(table){
      table.string('tag_name', 200).nullable();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('tags_questions', function(table){
      table.dropColumn('tag_name')
    })
  ])
};
