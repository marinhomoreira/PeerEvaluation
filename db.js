var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = Schema({
	name : String,
	ucid : String,
	email : String,
	group : [groupSchema]
});

var groupSchema = Schema({
	number : Number,
	type : String
});

var evaluationsSchema = Schema({
	_evaluator : {
		type : Schema.Types.ObjectId,
		ref : 'Student'
	},
	_group : {
		type : Schema.Types.ObjectId,
		ref : 'Group'
	},
	iteration : Number,
	memberEvaluation : [memberEvaluationSchema],
	date : Date
});

var memberEvaluationSchema = Schema({
	_evaluated : {
		type : Schema.Types.ObjectId,
		ref : 'Student'
	},
	grade : String,
	comments : String
});

mongoose.model('Student', studentSchema);
mongoose.model('Group', groupSchema);
mongoose.model('Evaluations', evaluationsSchema);
mongoose.model('MemberEvaluation', memberEvaluationSchema);

var config = require('./config/config');

mongoose.connect(config.dbUrl, config.dbName);

var Student = mongoose.model('Student');
var Group = mongoose.model('Group');
var Evaluations = mongoose.model('Evaluations');
var MemberEvaluation = mongoose.model('MemberEvaluation');
