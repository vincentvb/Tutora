const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  }, 
  tags: function() {
    return this.hasMany('Tag');
  }, 
  tags_profiles: function(){
    return this.hasMany('Tags_Profile')
  }
});

module.exports = db.model('Profile', Profile);
