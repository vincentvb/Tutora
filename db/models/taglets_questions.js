const db = require('../');

const Taglets_Question = db.Model.extend({
  tableName: 'taglets_questions',
  taglets: function() {
    return this.belongsTo('Taglet', 'taglet_id');
  }, 
  questions: function(){
    return this.belongsTo('Question', 'question_id')
  }
});

module.exports = db.model('Taglets_Question', Taglets_Question);