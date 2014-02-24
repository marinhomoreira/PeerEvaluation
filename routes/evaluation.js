var mongoose = require( 'mongoose' );

var Student = mongoose.model('Student');
var Group = mongoose.model('Group');
var Evaluations = mongoose.model('Evaluations');
var MemberEvaluation = mongoose.model('MemberEvaluation');


exports.create = function(req, res){
	evaluator = req.session.student;
	
	var queryParams = {group:req.session.group}
	
	Student
		.find(queryParams)
		.populate({
			path:'group'
			//, match:{type:req.body.project}
			//, select: '_id'
			})
		.exec(function(err, students, count){
			res.render('evaluation_new', {
				evaluator:evaluator,
				students:students
			});
		});
	
		
		
		/*
		logRequest(req);
	// TODO : PROBLEM! not populating this.
	var evalStudent = [];
	studentProvider.findByUCID(req.params.ucid, function(error, svals){
		// TODO: Verification of this!
		evalStudent = svals[0];
	});
	//console.log(evalStudent);
	
	studentProvider.findAllByGroupAndType({number: req.params.group, type: req.params.type}, function(error, svals){
		
		//console.log(svals);
	});
*/
}