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