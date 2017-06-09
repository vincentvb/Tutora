const db = require('../');

const Taglet = db.Model.extend({
  tableName: 'taglets',
  tags: function() {
    return this.belongsTo('Tag');
  }, 
  questions: function() {
    return this.belongsToMany('Question', 'taglets_question');
  },
});

module.exports = db.model('Taglet', Taglet);
