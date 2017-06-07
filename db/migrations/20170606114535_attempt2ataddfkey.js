
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('tags_profiles', function(table){
      table.string('tag_value', 200).nullable();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('tags_profiles', function(table){
      table.dropColumn('tag_value')
    })
  ])
};



// knex.schema.table('tags', function(table){
//       table.integer('tags_profiles_id').references('tags_profiles.id').onDelete('CASCADE');
//     }),

// knex.schema.table('tags', function(table){
//       table.dropColumn('tags_profiles_id')
//     })