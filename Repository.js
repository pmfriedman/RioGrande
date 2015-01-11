/**
 * Created by PMFriedman on 1/4/2015.
 */
"use strict";
var Enumerable = require('linq')
  , storage = require('node-persist')
  ;

storage.init();

function Repository() {};

Repository.prototype = {

  allUsers: [],

  getAllUsers: function(callback) {
    var users = storage.getItem('users');
    callback(null, users);
  },

  saveAllUsers: function(users, callback) {
    storage.setItem('users', users, callback);
  },

  getUserById: function(id, callback) {
    var err = null;
    Repository.prototype.getAllUsers(function(err, users) {
      var user = Enumerable.from(users).first(function(u) { return u.id == id });
      callback(err, user);
    });
    //var user = Enumerable.from(Repository.prototype.allUsers).first(function(u) { return u.id == id });
    //callback(err, user);
  },

  addOrUpdateUser: function(user, callback) {
    var err = null;
    Repository.prototype.allUsers.push(user);
    Repository.prototype.getAllUsers(function(err, users) {
      users = users || [];
      users.push(user);
      Repository.prototype.saveAllUsers(users, function(err) {
        callback(err, user);
      });
    });
    //callback(err, user);
  }

}

module.exports = Repository;
