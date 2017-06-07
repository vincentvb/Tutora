const Profile = require('./models/profiles.js');
const Question = require('./models/questions.js');
const Tags = require('./models/tags.js');
const Tags_Question = require('./models/tags_questions.js');

module.exports = {

	getUser : (userID, res) => {
		console.log(userID)
		Profile
		.where({id: userID}).fetch()
		.then(user => {
			res.send(user)
		})
	},

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

	saveQuestion : (qTitle, qBody, qId_profiles, qImage, qTags, callback) => {
		Question.forge({
			title : qTitle,
			body : qBody,
			profile_id : qId_profiles,
			image : qImage
		})
		.save()
		.then(student => {
			qTags.forEach(function(tag){
				Tags_Question.forge({
					question_id: student.id,
					category_name: tag
				}).save()
			})
		})
		.then(questiontags => {
			callback(null, questiontags);
		})
		.catch(error => {
			callback(error, null);
		})
	},

	getAllQuestions : (callback) => {
		Question.fetchAll()
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
		Question.where({ profile_id : userID }).fetchAll()
		.then(questions => {
			// console.log(questions, "QUESTIONS FROM GET")
			callback(null, questions);
		})
		.catch((error) => {
			callback(error, null);
		})
	}
}
