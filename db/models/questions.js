const db = require('../');

const Question = db.Model.extend({
	tableName: 'questions',
	profiles: () => {
		return this.belongsToMany(profiles);
	}, 
  tags: () => {
    return this.hasOne(tags)
  }, 
  tags_questions: () => {
    return this.hasMany(tags_questions)
  }
})

module.exports = db.model('Question', Question);