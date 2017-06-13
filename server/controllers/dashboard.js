const models = require('../../db/models');
const Bookshelf = require('../../db/Bookshelf.js')

module.exports.getRating = (req, res) => {
	req.user = JSON.parse(req.query.user)
	
	models.Question.where({answerer_id : req.user.id }).fetchAll()
		.then(questions => {
		    res.send(questions);
		})
		.error(err => {
			res.send(err);
		})
}

module.exports.getProfileInfo = (req, res) => {
	models.Profile.where({id: req.params.id}).fetch()
		.then(profile => {
			res.send(profile);
		})
		.error(err => {
			res.send(err);
		})
}