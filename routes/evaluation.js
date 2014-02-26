var mongoose = require('mongoose');

var Student = mongoose.model('Student');
var Group = mongoose.model('Group');
var Evaluations = mongoose.model('Evaluations');
var MemberEvaluation = mongoose.model('MemberEvaluation');

var utils = require('../utils');

exports.create = function(req, res) {
	utils.logRequest(req);

	evaluator = req.session.student;
	group = req.session.group;
	// Verify if there's a student on session or it's just someone trying to enter the page.
	// TODO : put this in the route - passport?
	if ( typeof evaluator === 'undefined' || typeof group === 'undefined') {
		res.redirect('/');
	} else {
		// Find all students from the group to populate the form
		var queryParams = {
			'group' : new mongoose.Types.ObjectId(group._id)
		}

		Student.find(queryParams).exec(function(err, students) {
			res.render('evaluation_new', {
				evaluator : evaluator,
				students : students,
				iteration : req.session.iteration, // TODO : Change how iteration is being retrieved
				group : group
			});
		});
	}
}

exports.save = function(req, res) {
	utils.logRequest(req);

	// This array will contain all MemberEvaluations to be pushed into Evaluations object below.
	var evaluations = [];
	for (student in req.body['evaluations']) {
		// For each student evaluated in the form, create a MemberEvaluation with its content
		var me = new MemberEvaluation({
			_evaluated : new mongoose.Types.ObjectId(student),
			grade : req.body['evaluations'][student]['grade'],
			comments : req.body['evaluations'][student]['comments']
		});
		evaluations.push(me);
	}

	// Create an Evaluations object to be persisted (saved)
	var evals = new Evaluations({
		_evaluator : req.session.student._id,
		_group : req.session.group._id,
		iteration : req.session.iteration, // TODO: CHANGE THE WAY ITERATION IS BEING RETRIEVED
		memberEvaluation : evaluations, // evaluations is the array populated above
		date : new Date()
	}).save(function(err, evalsS) {
		if (err)
			console.log(err);
		console.log("Saved evals:");
		console.log(evalsS);
		
		// TODO : Send email
		var email = require('../email');
		email.sendConfirmationEmail(evalsS._id);
		
		res.render('evaluation_success');
	});
}

exports.list = function(req, res) {
	utils.logRequest(req);

	var evaluations = Evaluations.find().populate({
		path : 'memberEvaluation._evaluated',
		model : 'Student',
		select : 'name ucid'
	}).populate({
		path : '_group',
		model : 'Group'
	}).populate({
		path : '_evaluator',
		model : 'Student'
	}).exec(function(err, evals) {
		if (err)
			console.log(err.message);
		//console.log(evals);
		res.render('evaluation_all', {
			title : 'Evaluations',
			evaluations : evals
		});
	});

}
