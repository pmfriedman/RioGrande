/**
 * Created by PMFriedman on 1/4/2015.
 */
"use strict";

function Repository() {};

Repository.prototype = {

  getUserById: function(id, callback) {
    var err = null;
    var user = {
      id: 'user1',
      name: 'John',
      validPassword: function(password) {
        return true;
      }
    };
    callback(err, user);
  },

  addOrUpdateUser: function(user, callback) {
    callback();
  }

}

module.exports = Repository;
