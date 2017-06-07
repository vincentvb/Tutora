
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('tags', function(table){
      table.integer('tags_profiles_id').references('tags_profiles.id').onDelete('CASCADE');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('tags', function(table){
      table.dropColumn('tags_profiles_id')
    })
  ])
};
