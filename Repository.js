/**
 * Created by PMFriedman on 1/4/2015.
 */
"use strict";
var Enumerable = require('linq');

function Repository() {};

Repository.prototype = {

  allUsers: [],

  getUserById: function(id, callback) {
    var err = null;
    var user = Enumerable.from(Repository.prototype.allUsers).first(function(u) { return u.id == id });
    callback(err, user);
  },

  addOrUpdateUser: function(user, callback) {
    var err = null;
    Repository.prototype.allUsers.push(user);
    callback(err, user);
  }

}

module.exports = Repository;
