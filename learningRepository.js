/**
 * Created by PMFriedman on 1/4/2015.
 */
"use strict";
var Enumerable = require('linq')
  , storage = require('node-persist')
  , moment = require('moment')
  ;


function Repository() {};

Repository.prototype = {

  getHasLearnedOnDate: function(params, callback) {
    var allLearned = storage.getItem('hasLearned') || {};
    var today = moment().format('MMMM D YYYY');
    var hasLearned = allLearned[today];
    callback(null, { hasLearned: hasLearned });
  },

  setHasLearnedOnDate: function(params, callback) {
    var hasLearned = params.hasLearned || false;
    var allLearned = storage.getItem('hasLearned') || {};
    var today = moment().format('MMMM D YYYY');
    allLearned[today] = hasLearned;
    storage.setItem('hasLearned', allLearned, callback(null));
  }

}

module.exports = Repository;
