const models = require('../../db/models');
const Bookshelf = require('../../db/Bookshelf.js')

// updateProfileSkills is located on Profiles controller

module.exports.getAll = (req, res) => {
  models.Tag.fetchAll()
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

module.exports.getAllTagsByQ = (req, res) => {
  models.Question.where({ id: req.params.questionId} ).fetchAll({ columns: ['tag_name']})
  .then(result => {
    // console.log(result)
    res.status(200).send(result)
  })
  .catch(err => {
    console.log(err)
  })
}

module.exports.getAllTaglets = (req, res) => {
  models.Taglet.fetchAll()
  .then(taglets => {
    res.status(200).send(taglets)
  })
  .catch(err => {
    res.status(503).send(err)
  })
}


module.exports.getAllTagletsByTag = (req, res) => {
  models.Taglet.where({ tag_id: req.params.tagId }).fetchAll()
  .then(taglets => {
    res.status(200).send(taglets)
  })
  .catch(err => {
    res.status(503).send(err)
  })
}

module.exports.getAllTagletsByQ = (req, res) => {
  models.Taglets_Question.where({ question_id: req.params.questionId }).fetchAll({
    withRelated: [
    {
      'taglets': function(qb){
        qb.select()
      }
    }
    ]
  })
  .then(taglets => {
    res.status(200).send(taglets)
  })
  .catch(err => {
    res.status(503).send(err)
  })
}

// models.Tags_Question.where( { question_id: req.params.questionId }).fetchAll({ 
//     withRelated: [
//     {
//       'tags': function(qb){
//         qb.select()
//       }
//     }
//     ]
//   })