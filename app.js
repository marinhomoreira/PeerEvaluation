
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
			iteration:0,
	
			ucid:req.param('ucid'),
			evaluator:req.param('evaluator'),
			group:req.param('groupNumber'),
			evaluatorEmail:req.param('evaluatorEmail'),
			
			teamMember1:req.param('teamMember1'),
			grade1:req.param('memberGrade1'),
			comment1:req.param('comment1'),

			teamMember2:req.param('teamMember2'),
			grade2:req.param('memberGrade2'),
			comment2:req.param('comment2'),

			teamMember3:req.param('teamMember3'),
			grade3:req.param('memberGrade3'),
			comment3:req.param('comment3'),

			teamMember4:req.param('teamMember4'),
			grade4:req.param('memberGrade4'),
			comment4:req.param('comment4'),
			
			teamMember5:req.param('teamMember5'),
			grade5:req.param('memberGrade5'),
			comment5:req.param('comment5'),
			
			teamMember6:req.param('teamMember6'),
			grade6:req.param('memberGrade6'),
			comment6:req.param('comment6'),

			teamMember7:req.param('teamMember7'),
			grade7:req.param('memberGrade7'),
			comment7:req.param('comment7'),
			
			teamMember8:req.param('teamMember8'),
			grade8:req.param('memberGrade8'),
			comment8:req.param('comment8'),
			
	}, function( error, docs) {
		res.redirect('/')
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
