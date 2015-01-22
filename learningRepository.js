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

  getHasLearnedOnDate: function(params, callback) {
    var hasLearned = true;
    callback(null, { hasLearned: hasLearned });
  },

  setHasLearnedOnDate: function(params, callback) {
    var hasLearned = params.hasLearned;
    callback(null);
  }

}

module.exports = Repository;
