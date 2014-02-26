var mongoose = require('mongoose');

var Student = mongoose.model('Student');
var Group = mongoose.model('Group');
var Evaluations = mongoose.model('Evaluations');
var MemberEvaluation = mongoose.model('MemberEvaluation');

exports.sendConfirmationEmail = function(evaluationId) {
	// TODO : REMOVE THIS FROM HERE! SUPER BAD! SUUUUUUUUUUUUUUUUUUPER BAD.
	var evaluation = Evaluations.findOne({
		_id : evaluationId
	}).populate({
		path : 'memberEvaluation._evaluated',
		model : 'Student',
		select : 'name ucid'
	}).populate({
		path : '_group',
		model : 'Group'
	}).populate({
		path : '_evaluator',
		model : 'Student'
	}).exec(function(err, evaluation) {
		if (err)
			console.log(err.message);
		var evaluator = evaluation._evaluator;

		var group = evaluation._group;

		var htmlBody = "<table><td>Submission date: </td><td>" + evaluation.date 
		+ "</td></tr><tr><td>Evaluator: </td><td>" + evaluator.name 
		+ "</td></tr><tr><td>Email: </td><td>" + evaluator.email 
		+ "</td></tr><tr><td>UCID: </td><td>" + evaluator.ucid 
		+ "</td></tr><tr><td>Group Type: </td><td>" + group.type 
		+ "</td></tr><tr><td>Group Number: </td><td>" + group.number 
		+ "</td></tr><tr><td>Iteration: </td><td>" + evaluation.iteration 
		+ "</td>";

		function breakTheSpell(mEval, index, array) {
			htmlBody += "</tr><tr><td>Team member: </td><td>" + mEval._evaluated.name 
			+ "</td></tr><tr><td>Grade: </td><td>" + mEval.grade 
			+ "</td></tr><tr><td>Comments: </td><td>" + mEval.comments 
			+ "</td>";
		}


		evaluation.memberEvaluation.forEach(breakTheSpell);

		htmlBody += "</table><br /><br /><i>If you didn't submit this evaluation, please inform the instructor and your TA.</i>";

		//console.log(html);

		var nodemailer = require("nodemailer");

		var smtpTransport = nodemailer.createTransport("SMTP", {
			service : "Gmail", // sets automatically host, port and connection security settings
			auth : {
				user : "peerevaluation.seng403@gmail.com",
				pass : "" // TODO : REMOVE THIS FROM HERE.
			}
		});

		// setup e-mail data with unicode symbols
		var mailOptions = {
			from : "SENG 403 Peer Evaluation System <peerevaluation.seng403@gmail.com>",
			to : evaluator.email, // receiver
			cc : "fm.rodrigues@ucalgary.ca",
			subject : "Evaluation", // subject
			text : "", // body
			html : htmlBody
		}

		// send mail with defined transport object
		smtpTransport.sendMail(mailOptions, function(error, response) {
			if (error) {
				console.log(error);
			} else {
				console.log("Message sent: " + response.message + " to " + evaluator.email);
			}
			smtpTransport.close();
			// shut down the connection pool, no more messages
		});
	});

};

