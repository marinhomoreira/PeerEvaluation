
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var EvaluationProvider = require('./evaluationprovider').EvaluationProvider;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
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

var evaluationProvider = new EvaluationProvider('localhost', 27017);

//Routes
//TODO: Fake LOGIN
app.get('/', routes.index);

// list all evaluations
app.get('/evaluation/all', function(req, res){
	evaluationProvider.findAll(function(error, evals){
		res.render('evaluation_all', {
			title: 'Evaluations',
			evaluations:evals
		});
	});
});

app.get('/evaluation/new', function(req, res) {
    res.render('evaluation_new', {
        title: 'New Peer Evaluation'
    });
});

//save new evaluation
app.post('/evaluation/new', function(req, res){
	evaluationProvider.save({
			ucid:req.param('ucid'),
			grade:req.param('memberGrade'),
			comment:req.param('comment'),
	}, function( error, docs) {
		res.redirect('/')
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
