const db = require('../');

const Tags_Profile = db.Model.extend({
  tableName: 'tags_profiles',
  tags: function() {
    return this.belongsTo('Tag', 'tags_id');
  }, 
  profiles: function(){
    return this.belongsTo('Profile', 'profile_id')
  }
});

module.exports = db.model('Tags_Profile', Tags_Profile);
