const db = require('../');

const Tags_Question = db.Model.extend({
  tableName: 'tags_questions',
  tags: function() {
    return this.belongsToMany('Tag');
  }, 
  questions: function(){
    return this.belongsToMany('Question')
  }
});

module.exports = db.model('Tags_Question', Tags_Question);