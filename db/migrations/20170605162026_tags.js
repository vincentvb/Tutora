
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('profiles', function(table){
      table.dropColumn('tutor_skills_id')
    }),
    knex.schema.dropTable('tutor_skills'),
    knex.schema.table('tags', function(table){
      table.dropColumn('profile_id')
    }), 
    knex.schema.createTableIfNotExists('tags_profiles', function(table){
      table.increments('id').unsigned().primary();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
      table.integer('tags_id').references('tags.id').onDelete('CASCADE');
    })
  ]);

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('tutor_skills', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
      table.string('skill', 400).nullable();
    }),
    knex.schema.table('tags', function(table){
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    }), 
    knex.dropTable('tags_profiles'), 
    knex.schema.profiles('profiles', function(table){
      table.integer('tutor_skills_id').references('tutor_skills.id').onDelete('CASCADE');
    })
  ])
};
