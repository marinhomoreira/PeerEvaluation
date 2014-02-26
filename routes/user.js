var mongoose = require('mongoose');

var Student = mongoose.model('Student');

exports.authenticate = function(req, res) {
	// Redirect to new evaluation form if info provided is from a valid student!
	// What if is from an admin? :D
	var params = {
		'ucid' : req.body.ucid,
		'email' : req.body.email
		//, 'group.type':req.body.project
	};

	student = Student.find(params).select('_id name email group').populate({
		path : 'group',
		model : 'Group',
		match : {
			type : req.body.project
		}
		,
		select : '_id number type'
	}).exec(function(err, students, count) {
		if (err)
			console.log(err);
		// Verify if there's only one student in a group with type from the form
		if (students.length == 1 && students[0]['group'].length == 1) {
			console.log('Student from user.authentication: ');
			console.log(students[0]);
			req.session.student = students[0];
			console.log('Group from user/authentication: ');
			console.log(students[0]['group'][0]);
			req.session.group = students[0]['group'][0];
			console.log('Setting iteration = 1');
			req.session.iteration = 1; // TODO: CHANGE THE WAY ITERATION IS BEING SET!
			res.redirect('/evaluation/new');
		} else {
			// TODO If students has more than one result... FUUUUUUUUUUUUUU~
			//req.session.message = "Couldn't find any student."
			res.redirect('back');
		}
	});
}