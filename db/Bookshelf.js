const Profile = require('./models/profiles.js');
const Question = require('./models/questions.js');
const Tags = require('./models/tags.js');
const Taglets = require('./models/taglets.js');
const Taglets_Question = require('./models/taglets_questions.js');

module.exports = {

	getUser : (userID, res) => {
		console.log(userID)
		Profile
		.where({id: userID}).fetch()
		.then(user => {
			res.send(user)
		})
	},

	getAllQbyTag : (tagname, callback) => {
		Question.where({ tag_name: tagname }).orderBy('-created_at').fetchAll()
		.then(question => {
			callback(null, question);
		})
		.catch(error => {
			callback(error, null);
		})
	},

	getAllQbyTags : (tagnames, callback) => {
		Question.where('tag_name', 'in', tagnames).orderBy('-created_at').fetchAll()
		.then(question => {
			callback(null, question);
		})
		.catch(error => {
			callback(error, null);
		})
	},
	

	getAllQbyTaglet : (tagletid, callback) => {
		Taglets_Question.where({ taglet_id: tagletid }).orderBy('-created_at').fetchAll({
			withRelated: [
			{
				'questions': function(qb){
					qb.select()
				}
			}
			]
		})
		.then(question => {
			callback(null, question);
		})
		.catch(error => {
			callback(error, null);
		})
	},

	// models.Tags_Question.where( { question_id: req.params.questionId }).fetchAll({ 
//     withRelated: [
//     {
//       'tags': function(qb){
//         qb.select()
//       }
//     }
//     ]
//   })


	updateProfile : (userID, userDescription, userAvatar, userType, userFirstName, userLastName, userPhone, callback) => {
		console.log(userID, userDescription, userAvatar, userType, userFirstName, userLastName, userPhone)
		Profile
		.where({ id: userID })
		.save({
			description : userDescription,
			avatar : userAvatar,
			type : userType,
			first : userFirstName,
			last : userLastName,
			phone : userPhone
		}, { method : 'update' })
		.then(doc => {
			console.log('SUCCESSFUL update of userProfile, status: ', doc);
			callback(null, doc);
		})
		.catch(error => {
			console.log('ERROR when trying to update userProfile, ', error);
			callback(error, null);
		})
	},

	updateQuestion : (rating, questionId, answererId, questionAnswered) => {
		Question
		.where({ id: questionId})
		.save({
			feedback_rating: rating,
			answerer_id: answererId,
			status: questionAnswered
		}, {method : 'update' })
		.then(response => {
			console.log("SUCCESSFUL update of question", response);
		})
	},

	saveQuestion : (qTitle, qBody, qId_profiles, qImage, qTag, qTaglets, callback) => {
		var toProperCase = function(taglet){
			var firstletter = taglet.slice(0,1).toUpperCase()
			return firstletter+taglet.slice(1)	
		}

		var insertTaglets = function(question){
			qTaglets.forEach(function(taglet){
						var propercaseTaglet = toProperCase(taglet)

						Taglets.where({ value: propercaseTaglet }).fetch({columns: ['id']})
						.then(tagletinfo => {

							if (tagletinfo === null){
								return Taglets.forge({
									value: propercaseTaglet, 
									tag_id: question.attributes.tag_id
								}).save()
							} else {
								return tagletinfo
							}
						})
						.then(tagletinfo => {
							Taglets_Question.forge({ 
								taglet_id: tagletinfo.id, 
								question_id: question.id
							}).save()
						})
					})

					callback(null, question)
		}

		// when there is no category Id, save only the taglets
		if (!qTag){
			Question.forge({
					title : qTitle,
					body : qBody,
					profile_id : qId_profiles,
					image : qImage,
					status: false
				})
				.save()
				.then(question => {
					insertTaglets(question)
				})
			.catch(error => {
				callback(error, null)
			})
		}

		else {
			// when Tag ID exists 
			// select tag id
			// for each taglet, get taglet ids 
			// create new taglets 
			// insert into taglet_questions table 		
			Tags.where({ value: qTag }).fetch({ columns: ['id'] })
			.then(tagid => {
				Question.forge({
					title : qTitle,
					body : qBody,
					profile_id : qId_profiles,
					image : qImage, 
					tag_id: tagid.id,
					tag_name: qTag,
					status: false
				})
				.save()
				.then(question => {
					insertTaglets(question)
				})
			})
			.catch(error => {
				callback(error, null)
			})

		}		

	},

	getAllQuestions : (callback) => {
		Question.where( {status : false} ).orderBy('-created_at').fetchAll()
		.then(questions => {
			callback(null, questions);
		})
		.catch(error => {
			callback(error, null);
		})
	},

	getOneQuestion : (questionID, callback) => {
		console.log("QUESTION", questionID);
		Question.where({ id : questionID }).fetch()
		.then(question => {
			callback(null, question);
		})
		.catch(error => {
			callback(error, null);
		})
	},

	getUserQuestions : (userID, callback) => {
		Question.where({ profile_id : userID , status: false}).orderBy('-created_at').fetchAll()
		.then(questions => {
			// console.log(questions, "QUESTIONS FROM GET")
			callback(null, questions);
		})
		.catch((error) => {
			callback(error, null);
		})
	}

	// getUserQuestions : (userID, callback) => {
	// 	Question.where({ profile_id : userID , status: false}).orderBy('-created_at').fetchAll({
 //     	withRelated: [
 //        {
 //          'profiles': function(qb){
 //            qb.select('id', 'first', 'last', 'display', 'avatar')
 //          }
 //        }]
 //      })
	// 	.then(questions => {
	// 		// console.log(questions, "QUESTIONS FROM GET")
	// 		callback(null, questions);
	// 	})
	// 	.catch((error) => {
	// 		callback(error, null);
	// 	})
	// }


}
