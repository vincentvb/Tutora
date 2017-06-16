const models = require('../../db/models');
const Bookshelf = require('../../db/Bookshelf.js')
const saveImageToS3 = require('../middleware/images.js').uploadQuestionPic;
const client = require('../app.js').client;
const redisclient = require('../redis.js');

// module.exports.getOnlineQ = (req, res) => {
//   redisclient.smembersAsync("online")
//     .then(ids => {
//       models.Question.where('profile_id', 'in', ids).where({ status: false }).fetchAll()
//       .then(questions => {
//         res.status(200).send(questions)
//       })
//       .error(err => {
//         res.status(500).send(err)
//       })
//       .catch(e => {
//         console.log(e, "from catch")
//         res.sendStatus(404)
//       })
//     })

// }

module.exports.getOnlineQ = (req, res) => {
  redisclient.smembersAsync("online")
    .then(ids => {
      models.Question.where('profile_id', 'in', ids).where({ status: false }).orderBy('-created_at').fetchAll({
        withRelated: [
        {
          'profiles': function(qb){
            qb.select('id', 'first', 'last', 'display', 'avatar')
          }
        }]
      })
      .then(questions => {
        res.status(200).send(questions)
      })
      .error(err => {
        res.status(500).send(err)
      })
      .catch(e => {
        console.log(e, "from catch")
        res.sendStatus(404)
      })
    })

}

module.exports.getRecommendedQ = (req, res) => {
  // get profile skills 
  // for each profile skill, pull all questions
  // 

  // SELECT * 
  // FROM tags_profiles tp 
  // JOIN questions q 
  //  ON q.tag_id = tp.tags_id 
  // JOIN  
  // WHERE tp.profile_id = 2
}


module.exports.getOne = (req, res) => {
	Bookshelf.getOneQuestion(req.params.id, function(error, result) {
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

module.exports.getAllQbyTag = (req, res) => {
  // console.log(req.params.tagname, "TAG NAME")
  Bookshelf.getAllQbyTag(req.params.tagname, function(error, result){
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    }
    return res.send(result);
  })
}

module.exports.getAllQbyTaglet = (req, res) => {
  Bookshelf.getAllQbyTaglet(req.params.tagletid, function(error, result){
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    }
    return res.send(result);
  })
}


module.exports.updateUserQ = (req, res) => {
	console.log("BODY", req.body)
	Bookshelf.updateQuestion(req.body.rating, req.body.questionId, req.body.answererId.id, req.body.questionAnswered)
}

module.exports.postQuestion = (req, res) => {

	var taglets = req.body.taglets.map(taglet => taglet.value)

	if (req.body.image !== null) {
		saveImageToS3(req.body.image, req.body.userid, function(S3error, imageURL) {
			if (S3error) {
				console.log('There was an error with uploading the image: ', S3error);
			}
			Bookshelf.saveQuestion(req.body.title, req.body.body, req.body.userid, imageURL.Location, req.body.tags, taglets, function(error, result) {
				if (error) {
					console.log(error);
					return res.sendStatus(500);
				}
				console.log('The question have been saved to DB, ', result);
				return res.status(200).send(result);
			});
		});
	} else {
		Bookshelf.saveQuestion(req.body.title, req.body.body, req.body.userid,  '', req.body.tags, taglets, function(error, result) {
			if (error) {
				console.log(error);
				return res.sendStatus(500);
			}
			console.log('The question have been saved to DB, ', result);
			return res.status(200).send(result);
		});
	}
};

module.exports.addTagstoQ = (req, res) => {
	models.Tags_Question.forge({
		question_id: req.body.questionId,
		tag_name: req.body.catname
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

module.exports.addTagletstoQ = (req, res) => {
	models.Taglets_Question.forge({ 
		taglet_id: tagletinfo.id, 
		question_id: question.id
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

