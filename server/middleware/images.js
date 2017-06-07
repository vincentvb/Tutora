var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config/aws.config.json');

module.exports.uploadProfilePic = function(imageData, userID, callback) {
		var s3Bucket = new AWS.S3({
		  params: {Bucket: 'talentedtoasters/profilepictures'} 
		});
		
		var imageBuffer = new Buffer(imageData, 'base64');

		var data = {
		  Key: 'userid_' + userID,
		  Body: imageBuffer,
		  ACL:'public-read'
		};

		s3Bucket.upload(data, function(error, data) {
			callback(error, data);
		});
};

module.exports.uploadQuestionPic = function(imageData, userID, callback) {
		var s3Bucket = new AWS.S3({
		  params: {Bucket: 'talentedtoasters/questionpictures'} 
		});
		
		var imageBuffer = new Buffer(imageData, 'base64');

		var data = {
		  Key: Math.random() + ':userid' + userID,
		  Body: imageBuffer,
		  ACL:'public-read'
		};

		s3Bucket.upload(data, function(error, data) {
			callback(error, data);
		});
};

// In case we ever need to use it, here is how you do a get:
// var urlParams = {Bucket: 'talentedtoasters/profilepictures', Key: 'The princess!'};
// s3Bucket.getSignedUrl('getObject', urlParams, function(error, url) {
//   if (error) {
//     console.log('There was an error in getting the image!', error);
//   }
//   console.log('the url of the image is', url);
// });