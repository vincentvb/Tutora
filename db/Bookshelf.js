const Profile = require('./models/profiles.js');
const Question = require('./models/questions.js');

module.exports = {
	
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

	saveQuestion : (qTitle, qBody, qId_profiles, qImage, callback) => {
		Question.forge({
			title : qTitle,
			body : qBody,
			profile_id : qId_profiles,
			image : qImage
		})
		.save()
		.then(student => {
			callback(null, student);
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

};


