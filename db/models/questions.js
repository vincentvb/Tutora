const db = require('../');

const Question = db.Model.extend({
	tableName: 'questions',
	profiles: () => {
		return this.belongsToMany(profiles);
	}
})

module.exports = db.model('Question', Question);