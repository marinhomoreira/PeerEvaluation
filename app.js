
/**
 * Module dependencies.
 */

require('./db');

var express = require('express');
var routes = require('./routes');

var http = require('http');
var path = require('path');

// ROUTES
var user = require('./routes/user');
var student = require('./routes/student');
var evaluation = require('./routes/evaluation');

var app = express();

var config = require('./config/config');

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
//app.use(express.logger('dev'));
app.use(express.logger());
app.use(express.cookieParser());
app.use(express.session({ secret: config.secret }));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Handle 404
app.use(function(req, res) {
	res.status(404);
	res.render('404.jade', {title: '404: Yo, where am I?'});
});

// Handle 500
app.use(function(error, req, res, next) {
	res.status(500);
	res.render('500.jade', {title:'500: Internal Server Error', error: error});
});

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

// TODO Adapt all student routes to the new student model
//app.get('/student', student.list);
//app.get('/student/all', student.list);
//app.get('/student/new', student.create); // TODO Adapt to new model
//app.post('/student/save', student.save); // TODO Adapt to new model
//app.get('/student/:ucid', student.find); // TODO Adapt to new model
//app.get('/student/all/:type/:group', student.findByGroupTypeAndNumber); // TODO Adapt to new model

app.post('/user/authenticate', user.authenticate);

app.get('/evaluation/new', evaluation.create);
app.post('/evaluation/new', evaluation.save);

//app.get('/evaluation/all', evaluation.list);

app.get('/evaluation/a181a603769c1f98ad927e7367c7aa51', evaluation.list);
app.get('/evaluation/a181a603769c1f98ad927e7367c7aa51/:projectType/:iterationNumber', evaluation.listByFilter);


app.get("*", function(request, response, next) {
	//TODO : if it's not public, should be redirected to / or 404!
  //response.redirect('/');
	next();
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
