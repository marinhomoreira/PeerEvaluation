
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { message: req.session.message });
	console.log(req.session.group);
	console.log('s: '+req.session.student);
	req.session.message = null;
};