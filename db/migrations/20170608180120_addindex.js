
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('taglets', function(t){
      t.index(['tag_id'])
    }), 
    knex.schema.table('questions', function(t){
      t.index(['profile_id'])
    }), 
    knex.schema.table('questions', function(t){
      t.index(['answerer_id'])
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('taglets', function(t){
      t.dropIndex(['tag_id'])
    }),
    knex.schema.table('questions', function(t){
      t.dropIndex(['profile_id'])
    }), 
    knex.schema.table('questions', function(t){
      t.dropIndex(['answerer_id'])
    })  
  ])
};
