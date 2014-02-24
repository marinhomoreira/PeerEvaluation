
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

var evaluationProvider = new EvaluationProvider('localhost', 27017);
var studentProvider = new StudentProvider('localhost', 27017);

// TODO : ADD AUTHENTICATION FROM HERE!
// ROUTES
app.get('/', routes.index);

app.get('/student', student.list);
app.get('/student/all', student.list);
app.get('/student/new', student.create);
app.post('/student/save', student.save); // TODO Group?
app.get('/student/:ucid', student.find);

app.get('/student/all/:type/:group', student.findByGroupTypeAndNumber);

app.post('/user/authenticate', user.authenticate);

app.get('/evaluation/new', evaluation.create);

//DEPRECATED ROUTES


// list all evaluations
app.get('/evaluation/all', function(req, res){
	logRequest(req);
	evaluationProvider.findAll(function(error, evals){
		res.render('evaluation_all', {
			title: 'Evaluations',
			evaluations:evals
		});
	});
});
/*
app.get('/evaluation/new/:ucid/:type/:group', function(req, res) {
    logRequest(req);
	// TODO : PROBLEM! not populating this.
	var evalStudent = [];
	studentProvider.findByUCID(req.params.ucid, function(error, svals){
		// TODO: Verification of this!
		evalStudent = svals[0];
	});
	//console.log(evalStudent);
	
	studentProvider.findAllByGroupAndType({number: req.params.group, type: req.params.type}, function(error, svals){
		res.render('evaluation_new', {
			evaluator:evalStudent,
			students:svals
		});
		//console.log(svals);
	});
	
});
*/
//save new evaluation
app.post('/evaluation/new/:ucid/:type/:group', function(req, res){
	logRequest(req);
	console.log(req.body);
	// TODO: HOW TO  POPULATE?!
	/*
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
*/
	});


app.get("*", function(request, response, next) {
	//if it's not public, should be redirected to / or 404!
  //response.redirect('/');
	next();
});

Date.prototype.format = function(format) {
//author: meizz
  var o = {
    "M+" : this.getMonth()+1, //month
    "d+" : this.getDate(),    //day
    "h+" : this.getHours(),   //hour
    "m+" : this.getMinutes(), //minute
    "s+" : this.getSeconds(), //second
    "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
    "S" : this.getMilliseconds() //millisecond
  }

  if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
    (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,
      RegExp.$1.length==1 ? o[k] :
        ("00"+ o[k]).substr((""+ o[k]).length));
  return format;
}

function logRequest(req) {
	console.log(new Date().format("yy-MM-dd h:mm:ss") +" "+ req.socket._peername.address + ":"+ req.socket._peername.port + " " + req.method + " " + req.url);
}




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
