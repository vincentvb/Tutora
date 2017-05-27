
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('questions', function (table) {
      table.increments('id').unsigned().primary();
      table.string('title', 200).nullable();
      table.string('body', 2000).nullable();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
      table.string('image', 200).nullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('tutor_skills', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
      table.string('skill', 400).nullable();
    }),
    knex.schema.table('profiles', function(table) {
    	table.string('description', 2000).nullable();
    	table.string('avatar', 300).nullable();
    	table.string('type', 50).nullable();
    	table.integer('avg_rating', 20).nullable();
      table.integer('tutor_skills_id').references('tutor_skills.id').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('tags', function (table) {
      table.increments('id').unsigned().primary();
    	table.string('value', 300).nullable();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('tags_question', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('question_id').references('questions.id').onDelete('CASCADE');
      table.integer('tags_id').references('tags.id').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('ratings', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    	table.integer('rating', 20).nullable();
    	table.integer('rated_by').references('profiles.id').onDelete('CASCADE');
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('tutor_certifications', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    	table.string('value', 400).nullable();
    	table.string('description', 1000).nullable();
    })
  ]);  
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('questions'),
    knex.schema.dropTable('tutor_skills'),
    knex.schema.dropTable('tags'),
    knex.schema.dropTable('tags_question'),
    knex.schema.dropTable('ratings'),
    knex.schema.dropTable('tutor_certifications'),
    knex.schema.table('profiles', function (table) {
    	table.dropColumn('description');
    	table.dropColumn('avatar');
    	table.dropColumn('type');
    	table.dropColumn('avg_rating');
    	table.dropColumn('tutor_skills_id');
    })
  ]);
};