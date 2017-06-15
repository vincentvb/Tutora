const db = require('../');

const Question = db.Model.extend({
	tableName: 'questions',
	profiles: function(){
		return this.belongsTo('Profile', 'profile_id');
  },  
  tags: () => {
    return this.hasOne(tags)
  }, 
  tags_questions: () => {
    return this.hasMany(tags_questions)
  }
})

module.exports = db.model('Question', Question);