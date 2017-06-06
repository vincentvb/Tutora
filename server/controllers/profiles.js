const models = require('../../db/models');
const Bookshelf = require('../../db/Bookshelf.js');
const saveImageToS3 = require('../middleware/images.js').uploadProfilePic;

module.exports.getAll = (req, res) => {
  models.Profile.fetchAll()
    .then(profiles => {
      res.status(200).send(profiles);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

// module.exports.create = (req, res) => {
//   models.Profile.forge({ username: req.body.username, password: req.body.password })
//     .save()
//     .then(result => {
//       res.status(201).send(result.omit('password'));
//     })
//     .catch(err => {
//       if (err.constraint === 'users_username_unique') {
//         return res.status(403);
//       }
//       res.status(500).send(err);
//     });
// };

module.exports.getOne = (req, res) => {
  models.Profile.where({ id: req.params.id }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      res.status(200).send(profile);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.updateProfile = (req, res) => {
  console.log(req.body);
  models.Profile.where({ id: req.body.id }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      return profile.save({
        first: req.body.first || profile.first,
        last: req.body.last || profile.last,
        display: req.body.display || profile.display,
        email: req.body.email || profile.email,
        phone: req.body.phone || profile.phone,
        type: req.body.type || profile.type,
        description: req.body.description || profile.description,
        avatar: req.body.avatar || profile.avatar
      }, { method: 'update' });
    })
    .then(() => {
      res.redirect("/profile");
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

// module.exports.deleteOne = (req, res) => {
//   models.Profile.where({ id: req.params.id }).fetch()
//     .then(profile => {
//       if (!profile) {
//         throw profile;
//       }
//       return profile.destroy();
//     })
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .error(err => {
//       res.status(503).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// };

// This works when you do a put on: http://localhost:3000/api/profiles/update/4
// This is not currently being used. 
// module.exports.updateProfileById = (req, res) => {
//   console.log('IN HERE');
//   Bookshelf.updateProfile(Number(req.params.id), req.headers.userdescription, req.headers.useravatar, req.headers.usertype, req.headers.userfirstname, req.headers.userlastname, req.headers.userphone, function (error, result) {
//     if (error) {
//       return res.sendStatus(500);
//       console.log(error);
//     }
//     return res.sendStatus(201);
//     console.log('The users profile where updated, ' + result);
//   });
// };

module.exports.updatePicture = (req, res) => {
  saveImageToS3(req.body.data, req.params.id, function(S3error, imageURL) {
    if (S3error) {
      console.log(S3error);
    }
    console.log(imageURL)
    models.Profile.where({ id: req.params.id }).fetch()
    .then(profile => {
      console.log('the profile! ', profile)
      if (!profile) {
        console.log('Error with finding profile');
      }
      return profile.save({
        avatar: imageURL.Location
      }, { method: 'update' });
    })
    .then(() => {
      res.sendStatus(200);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
  });
};
