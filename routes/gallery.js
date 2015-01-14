var express = require('express');
var router = express.Router()
  , repo = require('../galleryRepository')
  , debug = require('debug')('RioGrande');

/* GET home page. */
router.get('/:userId', function(req, res) {

  // TODO: security

  res.render('gallery', { userId: req.params.userId  });
});

router.get('/image/:imageId', function(req, res) {
  var filePath = new repo().getFilePathForImageById(req.params.imageId);
  debug('sending image from ' + filePath);
  res.sendFile(filePath);

});

module.exports = router;
/**
 * Created by PMFriedman on 1/13/2015.
 */
