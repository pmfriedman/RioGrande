var express = require('express');
var router = express.Router()
  , repo = require('../learningRepository')
  , debug = require('debug')('RioGrande')
  , moment = require('moment');

/* GET home page. */
router.get('/today', function(req, res) {
  var now = moment();
  new repo().getHasLearnedOnDate({ date: now }, function(error, data) {

    new repo().getImageCatalog(null, function(error, catalog) {

      var tag = 'unsure';
      if (data.hasLearned === true) {
        tag = 'happy';
      } else if (data.hasLearned === false) {
        tag = 'sad';
      }

      var relevantImages = catalog.items.filter(function(item) {
        return item.tags.indexOf(tag) >= 0;
      });

      var imageIndex = Math.floor((Math.random() * relevantImages.length))

      res.render('learning', { hasLearned: data.hasLearned, fileName: relevantImages[imageIndex].fileName  });
    });

  });
});

router.post('/today', function(req, res) {

  var hasLearned = null;
  if (req.body.hasLearned == 'YES') {
    hasLearned = true;
  } else if (req.body.hasLearned == 'NO') {
    hasLearned = false;
  }

  new repo().setHasLearnedOnDate({ hasLearned: hasLearned }, function(error) {
    res.redirect('/learning/today');

  });
});

module.exports = router;
/**
 * Created by PMFriedman on 1/13/2015.
 */
