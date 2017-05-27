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

	getAllQuestions : () => {
		Question.collection
		.fetch()
		.then(documents => {
			callback(null, documents);
		})
		.catch(error => {
			callback(error, null);
		})
	}

};