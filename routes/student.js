var mongoose = require( 'mongoose' );

var Student = mongoose.model('Student');
var Group = mongoose.model('Group');
var Evaluations = mongoose.model('Evaluations');
var MemberEvaluation = mongoose.model('MemberEvaluation');

exports.list = function(req, res){
	logRequest(req);
	Student.find().populate('group', 'number type').exec( function ( err, students, count ){
		res.render( 'student_all', {
			title : 'All Students',
			students : students
		});
	});
};

exports.find = function(req, res){
	logRequest(req);
	Student.find({ ucid:req.params.ucid }).exec(function(err, students, count){
		res.render( 'student_all', {
			title : 'Student',
			students : students
		});
	});
};

exports.create = function(req, res) {
	logRequest(req);
	res.render('student_new');
};

exports.save = function (req, res) {
	logRequest(req);
	var stu = new Student({
		name : req.body.name,
		ucid : req.body.ucid,
		email : req.body.email,
		//group : [] // TODO
	});
	stu.save( function( err, student, count ){
		if(err) console.log(err);
	});
	
	res.redirect('/student/');
};

exports.findByGroupTypeAndNumber = function(req, res) {
	logRequest(req);
	Group.findOne({'type': req.params.type, 'number': req.params.group}).exec(
		function(err,group,count) {
			if(err) console.log(err);
			Student.find({group:group._id}).populate('group').exec(function(err, students, count) {
				res.render( 'student_all', {
					title : 'Students',
					students : students
				});
			});
		}
	);
};


function logRequest(req) {
	//console.log(new Date().format("yy-MM-dd h:mm:ss") +" "+ req.socket._peername.address + ":"+ req.socket._peername.port + " " + req.method + " " + req.url);
}