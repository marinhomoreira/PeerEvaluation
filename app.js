
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var EvaluationProvider = require('./evaluationprovider').EvaluationProvider;
var StudentProvider = require('./studentprovider').StudentProvider;

var app = express();

// all environments
app.set('port', process.env.PORT || 3002);
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
var studentProvider = new StudentProvider('localhost', 27017);

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
			
			teamMember9:req.param('teamMember9'),
			grade9:req.param('memberGrade9'),
			comment9:req.param('comment9'),
			
	}, function( error, docs) {
		var nodemailer = require("nodemailer");

		var smtpTransport = nodemailer.createTransport("SMTP",{
		   service: "Gmail",  // sets automatically host, port and connection security settings
		   auth: {
			   user: "peerevaluation.seng403@gmail.com",
			   pass: "robjuliamarinhotristam"
		   }
		});

		// setup e-mail data with unicode symbols
		var mailOptions = {
			from: "SENG 403 Peer Evaluation System <peerevaluation.seng403@gmail.com>",
			to: req.param('evaluatorEmail'), // receiver
			cc: "fm.rodrigues@ucalgary.ca",
			subject: "Evaluation", // subject
			text: "", // body
			html: "Iteration: 0<br />"+
				"UCID: "+ req.param('ucid')+"<br />"+
				"Evaluator: "+ req.param('evaluator')+"<br />"+
				"Group #: "+ req.param('groupNumber')+"<br /><br />"+
				"Team Member 1"+"<br />"+
				req.param('teamMember1')+ " - "+ req.param('memberGrade1')+"<br />"+
				"Comments: "+ req.param('comment1')+"<br /><br />"+
				"Team Member 2"+"<br />"+
				req.param('teamMember2')+ " - "+ req.param('memberGrade2')+"<br />"+
				"Comments: "+ req.param('comment2')+"<br /><br />"+
				"Team Member 3"+"<br />"+
				req.param('teamMember3')+ " - "+ req.param('memberGrade3')+"<br />"+
				"Comments: "+ req.param('comment3')+"<br /><br />"+
				"Team Member 4"+"<br />"+
				req.param('teamMember4')+ " - "+ req.param('memberGrade4')+"<br />"+
				"Comments: "+ req.param('comment4')+"<br /><br />"+
				"Team Member 5"+"<br />"+
				req.param('teamMember5')+ " - "+ req.param('memberGrade5')+"<br />"+
				"Comments: "+ req.param('comment5')+"<br /><br />"+
				"Team Member 6"+"<br />"+
				req.param('teamMember6')+ " - "+ req.param('memberGrade6')+"<br />"+
				"Comments: "+ req.param('comment6')+"<br /><br />"+
				"Team Member 7"+"<br />"+
				req.param('teamMember7')+ " - "+ req.param('memberGrade7')+"<br />"+
				"Comments: "+ req.param('comment7')+"<br /><br />"+
				"Team Member 8"+"<br />"+
				req.param('teamMember8')+ " - "+ req.param('memberGrade8')+"<br />"+
				"Comments: "+ req.param('comment8')+"<br /><br />"+
				"Team Member 9"+"<br />"+
				req.param('teamMember9')+ " - "+ req.param('memberGrade9')+"<br />"+
				"Comments: "+ req.param('comment9')+"<br /><br />"+
				"<i>If you didn't submit this evaluation, please inform the instructor and your TA.</i>"
		}

		// send mail with defined transport object
		smtpTransport.sendMail(mailOptions, function(error, response){
			if(error){
				console.log(error);
			}else{
				console.log("Message sent: " + response.message + " to "+ req.param('evaluatorEmail'));
			}

			smtpTransport.close(); // shut down the connection pool, no more messages
		});
		res.redirect('/')
	});
});



// list all students
app.get('/student/all', function(req, res){
	studentProvider.findAll(function(error, svals){
		res.render('student_all', {
			title: 'Students',
			students:svals
		});
	});
});

app.get('/student/new', function(req, res) {
    studentProvider.save({
			ucid:"123456",
			name:"John Smith",
			group:[{
				number:"5",
				type:"supplier",
				evaluations:[],
			}],
			email:"john@smith.com",

			teamMember1:"Mary Ann",
			grade1:"A+",
			comment1:"She worked a lot.",
			
		}, function( error, docs) {
			res.redirect('/student/all')
		});
	
});




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
