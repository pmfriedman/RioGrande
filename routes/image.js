var express = require('express');
var router = express.Router()
  , repo = require('../learningRepository')
  , debug = require('debug')('RioGrande')
  ;

/* GET home page. */
router.get('', function(req, res) {

  new repo().getImageCatalog(null, function(error, data) {

    var catalog = data.items;


    res.render('image', { catalog: catalog  });
  });

});

module.exports = router