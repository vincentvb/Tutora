const db = require('../');

const Payments = db.Model.extend({
	tableName: 'payments'
});

module.exports = db.model('Payments', Payments);