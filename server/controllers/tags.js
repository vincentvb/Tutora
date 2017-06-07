const models = require('../../db/models');
const Bookshelf = require('../../db/Bookshelf.js')

// updateProfileSkills is located on Profiles controller

module.exports.getAll = (req, res) => {
  models.Tag.fetchAll({columns: ['value']})
  .then(tags => {
    res.status(200).send(tags)
  })
  .catch(err => {
    res.status(503).send(err)
  })
}

module.exports.getAllTagsbyProfile = (req, res) => {
  models.Tags_Profile.where( { profile_id: req.params.profileId }).fetchAll({ 
    withRelated: [
    {
      'tags': function(qb){
        qb.select()
      }
    }
    ]
  })
  .then(result => {
    // console.log(result)
    res.status(200).send(result)
  })
  .catch(err => {
    console.log(err)
  })
}

module.exports.getAllTagsbyQ = (req, res) => {
  models.Tags_Question.where( { question_id: req.params.questionId }).fetchAll({ 
    withRelated: [
    {
      'tags': function(qb){
        qb.select()
      }
    }
    ]
  })
  .then(result => {
    // console.log(result)
    res.status(200).send(result)
  })
  .catch(err => {
    console.log(err)
  })
}