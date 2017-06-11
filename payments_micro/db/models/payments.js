const db = require('../');

const Balances = db.Model.extend({
	tableName: 'balances'
});

module.exports = db.model('Balances', Balances);