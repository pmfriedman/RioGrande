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

  getFilePathForImageById: function(id) {
    return __dirname + '/data/images/' + id;
  }

}

module.exports = Repository;
