var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var studentSchema = Schema({
	name : String,
	ucid : String,
	email : String,
	group : [{ type: Schema.Types.ObjectId, ref: 'Group'}]
});

var groupSchema = Schema({
	number : Number,
	type : String,
	evaluations : [{type: Schema.Types.ObjectId, ref: 'Evaluations'}]
});

var evaluationsSchema = Schema({
	_evaluator : [{type: Schema.Types.ObjectId, ref: 'Student'}],
	iteration : Number,
	memberEvaluation : [{type: Schema.Types.ObjectId, ref: 'MemberEvaluation'}],
	date : Date
});

var memberEvaluationSchema = Schema({
	_evaluated : [{type: Schema.Types.ObjectId, ref: 'Student'}],
	grade : String,
	comments : String
});

/* var Student = mongoose.model('Student', studentSchema);
var Group = mongoose.model('Group', groupSchema);
var Evaluations = mongoose.model('Evaluations', evaluationSchema);
var MemberEvaluation = mongoose.model('MemberEvaluation', memberEvaluationSchema);
 */
mongoose.model('Student', studentSchema);
mongoose.model('Group', groupSchema);
mongoose.model('Evaluations', evaluationsSchema);
mongoose.model('MemberEvaluation', memberEvaluationSchema);

mongoose.connect('localhost', 'student-test');