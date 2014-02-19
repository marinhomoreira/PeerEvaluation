
exports.list = function(req, res){
	res.send("respond with a resource");
};

exports.authenticate = function(req, res){
	//TODO USER AUTHENTICATION
	// Redirect to new evaluation form if info provided is from a valid student!
	// What if is from an admin? :D
	res.redirect('/evaluation/new/123456/supplier/1');
	//res.redirect('/evaluation/new/'+req.params.ucid+"/"+req.params.type+"/"+req.params.group);
}