var express = require('express');
var router = express.Router()
  , repo = require('../galleryRepository')
  , debug = require('debug')('RioGrande')
  , tesseract = require('node-tesseract');

/* GET home page. */
router.get('/:userId', function(req, res) {

  tesseract.process('"' + __dirname + '/../data/uploads/2015-01-18 10.48.021421726392886.jpg"',function(err, text) {
    if(err) {
      console.error(err);
    } else {
      console.log(text);
    }
  });

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




    res.end("File uploaded.");
  }
});

module.exports = router;
/**
 * Created by PMFriedman on 1/13/2015.
 */
