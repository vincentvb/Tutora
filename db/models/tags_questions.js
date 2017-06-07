const db = require('../');

const Tags_Question = db.Model.extend({
  tableName: 'tags_questions',
  tags: function() {
    return this.belongsTo('Tag', 'tags_id');
  }, 
  questions: function(){
    return this.belongsTo('Question', 'question_id')
  }
});

module.exports = db.model('Tags_Question', Tags_Question);