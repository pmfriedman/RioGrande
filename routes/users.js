var express = require('express');
var router = express.Router()
  , Repository = require('../Repository')
  , passport = require('passport')
;

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {

  if (req.body.username && req.body.password) {
    var user = {
      id: req.body.username,
      name: 'John',
      validPassword: function(password) {
        return true;
      }
    };
    new Repository().addOrUpdateUser(user, function() {
      req.login(user, function(err) {
        res.redirect('/');
      });
    })
  } else {
    res.redirect('/users/register');
  }

});

router.post('/login',
  // temp hack for development, uncomment below when not needed
  //function(req, res) {
  //  new Repository().getUserById('foo', function(err, user) {
  //    req.login(user, function(err) {
  //      return res.redirect('/');
  //    });
  //  });
  //}
  passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/' })
);

module.exports = router;
