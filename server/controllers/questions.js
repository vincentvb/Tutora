const models = require('../../db/models');
const Bookshelf = require('../../db/Bookshelf.js')
const saveImageToS3 = require('../middleware/images.js').uploadQuestionPic;

module.exports.getOne = (req, res) => {
	Bookshelf.getOneQuestion(req.user.id, function(error, result) {
		if (error) {
			console.log(error);
			return res.sendStatus(500);
		}
		return res.send(result);
	})
};

module.exports.getAll = (req, res) => {
	Bookshelf.getAllQuestions(function(error, result) {
		if (error) {
			console.log(error);
			return res.sendStatus(500);
		}
		return res.send(result);
	});
};

module.exports.getUserQ = (req, res) => {
	Bookshelf.getUserQuestions(req.params.id, function(error, result) {
		if (error) {
			console.log(error);
			return res.sendStatus(500);
		}
		return res.send(result);
	});
};

module.exports.postQuestion = (req, res) => {
	if (req.body.image !== null) {
		saveImageToS3(req.body.image, req.body.userid, function(S3error, imageURL) {
			if (S3error) {
				console.log('There was an error with uploading the image: ', S3error);
			}
			Bookshelf.saveQuestion(req.body.title, req.body.body, req.body.userid, imageURL.Location, req.body.tags, function(error, result) {
				if (error) {
					console.log(error);
					return res.sendStatus(500);
				}
				console.log('The question have been saved to DB, ', result);
				return res.sendStatus(201);
			});
		});
	} else {
		Bookshelf.saveQuestion(req.body.title, req.body.body, req.body.userid,  '', req.body.tags, function(error, result) {
			if (error) {
				console.log(error);
				return res.sendStatus(500);
			}
			console.log('The question have been saved to DB, ', result);
			return res.sendStatus(201);
		});
	}
};

module.exports.addTagstoQ = (req, res) => {
	models.Tags_Question.forge({
		question_id: req.body.questionId,
		category_name: req.body.catname
	}).save()
	.then(result => {
    // console.log(result)
    res.status(200).send(result)
  })
	.error(err => {
        res.status(500).send(err)
      })
  .catch(e => {
    console.log(e, "from catch")
    res.sendStatus(404)
  })

}

