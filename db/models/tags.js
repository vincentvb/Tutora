const db = require('../');

const Tag = db.Model.extend({
  tableName: 'tags',
  questions: function() {
    return this.belongsToMany('Question', 'tags_question');
  },
  profiles: function(){
    return this.hasMany('Profile').through('tags_profiles')
  }, 
  taglets: function(){
    return this.hasMany('Taglet')
  }
});

module.exports = db.model('Tag', Tag);
