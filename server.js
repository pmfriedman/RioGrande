var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
  , session = require('express-session')
  , passport = require('passport')
  , Repository = require('./Repository')
  , LocalStrategy = require('passport-local').Strategy
  , debug = require('debug')('RioGrande')
  , multer = require('multer')
  ;

var routes = require('./routes/index');
var users = require('./routes/users')
  , gallery = require('./routes/gallery')
  , learning  = require('./routes/learning');

var app = express();

/*
 * Authentication Layer
 */

// Password session setup.
//    To support persistent Login sessions, Passport needs to be able to
//    serialize users into and deserialize users out of the session. Typically
//    this will be as simple as storing the user ID when serializing, and finding
//    the user by ID when deserializing.
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    new Repository().getUserById(id, function (err, user) {
        if (err) { debug('deserializeUser: %j', err); }
        done(err, user);
    });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
      new Repository().getUserById(username, function(err, user) {
          if (err) { return done(err); }
          if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
          }
          //if (!user.validPassword(password)) {
          //    return done(null, false, { message: 'Incorrect password.' });
          //}
        debug('hi');
          return done(null, user);
      });
  }
));

// configure file uploads

app.use(multer({ dest: './data/uploads/',
  rename: function (fieldname, filename) {
    return filename+Date.now();
  },
  onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...')
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path)
    done=true;
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/gallery', gallery);
app.use('/learning', learning);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
  debug(err);
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      debug(err.stack);
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
