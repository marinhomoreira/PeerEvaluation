exports.sendConfirmationEmail = function(evaluation) {
	/*
	var nodemailer = require("nodemailer");

	var smtpTransport = nodemailer.createTransport("SMTP", {
		service : "Gmail", // sets automatically host, port and connection security settings
		auth : {
			user : "peerevaluation.seng403@gmail.com",
			pass : "robjuliamarinhotristam"
		}
	});

	// setup e-mail data with unicode symbols
	var mailOptions = {
		from : "SENG 403 Peer Evaluation System <peerevaluation.seng403@gmail.com>",
		to : req.param('evaluatorEmail'), // receiver
		cc : "fm.rodrigues@ucalgary.ca",
		subject : "Evaluation", // subject
		text : "", // body
		html : "Iteration: 0<br />" + "UCID: " + req.param('ucid') + "<br />" + "Evaluator: " + req.param('evaluator') + "<br />" + "Group #: " + req.param('groupNumber') + "<br /><br />" + "Team Member 1" + "<br />" + req.param('teamMember1') + " - " + req.param('memberGrade1') + "<br />" + "Comments: " + req.param('comment1') + "<br /><br />" + "Team Member 2" + "<br />" + req.param('teamMember2') + " - " + req.param('memberGrade2') + "<br />" + "Comments: " + req.param('comment2') + "<br /><br />" + "Team Member 3" + "<br />" + req.param('teamMember3') + " - " + req.param('memberGrade3') + "<br />" + "Comments: " + req.param('comment3') + "<br /><br />" + "Team Member 4" + "<br />" + req.param('teamMember4') + " - " + req.param('memberGrade4') + "<br />" + "Comments: " + req.param('comment4') + "<br /><br />" + "Team Member 5" + "<br />" + req.param('teamMember5') + " - " + req.param('memberGrade5') + "<br />" + "Comments: " + req.param('comment5') + "<br /><br />" + "Team Member 6" + "<br />" + req.param('teamMember6') + " - " + req.param('memberGrade6') + "<br />" + "Comments: " + req.param('comment6') + "<br /><br />" + "Team Member 7" + "<br />" + req.param('teamMember7') + " - " + req.param('memberGrade7') + "<br />" + "Comments: " + req.param('comment7') + "<br /><br />" + "Team Member 8" + "<br />" + req.param('teamMember8') + " - " + req.param('memberGrade8') + "<br />" + "Comments: " + req.param('comment8') + "<br /><br />" + "Team Member 9" + "<br />" + req.param('teamMember9') + " - " + req.param('memberGrade9') + "<br />" + "Comments: " + req.param('comment9') + "<br /><br />" + "<i>If you didn't submit this evaluation, please inform the instructor and your TA.</i>"
	}

	// send mail with defined transport object
	smtpTransport.sendMail(mailOptions, function(error, response) {
		if (error) {
			console.log(error);
		} else {
			console.log("Message sent: " + response.message + " to " + req.param('evaluatorEmail'));
		}

		smtpTransport.close();
		// shut down the connection pool, no more messages
	});
*/
};

