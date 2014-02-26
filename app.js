
/**
 * Module dependencies.
 */

require('./db');

var express = require('express');
var routes = require('./routes');

var http = require('http');
var path = require('path');
var EvaluationProvider = require('./evaluationprovider').EvaluationProvider;
var StudentProvider = require('./studentprovider').StudentProvider;

// ROUTES
var user = require('./routes/user');
var student = require('./routes/student');
var evaluation = require('./routes/evaluation');

var app = express();

// all environments
app.set('port', process.env.PORT || 3002);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
//app.use(express.logger());
app.use(express.cookieParser());
app.use(express.session({ secret: 'keyboard cat' })); // CHANGE THIS!
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.configure(function(){
	app.use(express.bodyParser());
});


// TODO : ADD AUTHENTICATION FROM HERE!
// ROUTES
app.get('/', routes.index);

// TODO Adapt all routes to the new student model
app.get('/student', student.list);
app.get('/student/all', student.list);
//app.get('/student/new', student.create); // TODO Adapt to new model
//app.post('/student/save', student.save); // TODO Adapt to new model
//app.get('/student/:ucid', student.find); // TODO Adapt to new model
//app.get('/student/all/:type/:group', student.findByGroupTypeAndNumber); // TODO Adapt to new model

app.post('/user/authenticate', user.authenticate);

app.get('/evaluation/new', evaluation.create);
app.post('/evaluation/new', evaluation.save);

app.get('/evaluation/all', evaluation.list);


app.get("*", function(request, response, next) {
	//TODO : if it's not public, should be redirected to / or 404!
  //response.redirect('/');
	next();
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
