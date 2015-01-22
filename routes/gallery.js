var express = require('express');
var router = express.Router()
  , repo = require('../galleryRepository')
  , debug = require('debug')('RioGrande')
  , tesseract = require('node-tesseract');

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

router.post('/image/upload',function(req,res){
  if(done==true){
    console.log(req.files);

    tesseract.process('"' + __dirname + '/../' + req.files.userImage.path + '"',function(err, text) {
      if(err) {
        console.error(err);
      } else {
        console.log(text);

        res.end(text);
      }
    });


  }
});

module.exports = router;
/**
 * Created by PMFriedman on 1/13/2015.
 */
