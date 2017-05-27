const db = require('../');

const Question = db.Model.extend({
	tableName: 'questions'
	profiles: () => {
		return this.belongsTo(Profile);
	}
})

module.exports = db.model('Question', Question);