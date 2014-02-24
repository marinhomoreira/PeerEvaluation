
exports.list = function(req, res){
	res.send("respond with a resource");
};

var mongoose = require( 'mongoose' );

var Student = mongoose.model('Student');

exports.authenticate = function(req, res){
	// Redirect to new evaluation form if info provided is from a valid student!
	// What if is from an admin? :D
	var params = {
		'ucid':req.body.ucid
		//, 'email':req.body.email
	};
	
	// WARNING: IT WORKS WITH A STUDENT WITH ONLY ONE GROUP, WHAT ABOUT TWO GROUPS?!
	student = Student.find(params)
		.select('_id name email group')
		.populate({
			path:'group'
			, match:{type:req.body.project}
			, select: '_id'}
		)
		.exec(function(err, students, count){
			if(err) console.log(err);
			
			if(students.length == 1) {
				console.log('student from user/authentication: ' + students[0]);
				req.session.student = students[0];
				console.log('groups from user/authentication: ' + students[0]['group']);
				req.session.group = students[0]['group'][0]['id'];
				res.redirect('/eval/new'); //TODO: CHANGE THIS!
			} else {
				//req.session.message = "Couldn't find any student."
				res.redirect('back');
			}
	});
}