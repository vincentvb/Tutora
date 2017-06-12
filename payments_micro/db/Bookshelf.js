const Payments = require('./models/payments.js');

module.exports = {
	getBalance : (userID) => {
		Payments
		.where({
			user_id: userID
		}).fetch()
		.then(data => {
			return data;
		});
	},

	transaction : (userID, amount) => {
		Payments
		.where({user_id: userID})
		.save({
			funds : funds + amount
		}, {method : 'update'})
		.catch(error => {
			console.log('Error when updating funds, ', error);
		});
	},
};