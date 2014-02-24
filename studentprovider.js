var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

// OBJECTS' STRUCTURE
var EvaluationMemberSkel = {
	"teamMember":"",
	"grade":"",
	"comments":""
};

var EvaluationSkel = {
	"iteration" : "",
	"evaluations" : [EvaluationMemberSkel]
};

var GroupSkel = {
	"type" : "",
	"number": "",
	"evaluations" : [EvaluationSkel]
};

var StudentSkel = {
	"name" : "",
	"ucid" : "",
	"email" : "",
	"group" : [GroupSkel]
};


StudentProvider = function(host, port) {
	this.db = new Db('PeerEvaluationStudent',
		new Server(
			host, port,
			{auto_reconnect: true},
			{}
		)
	);
	this.db.open(function(){});
};


StudentProvider.prototype.getCollection = function(callback) {
	this.db.collection('students',
		function(error, student_collection) {
			if( error ) callback(error);
			else callback(null, student_collection);
		}
	);
};

//save new student
StudentProvider.prototype.save = function(students, callback) {
	this.getCollection(function(error, student_collection) {
		if(error) callback(error)
		else {
			students = createStudentsList(students);
			student_collection.insert(students, function() {
				callback(null, students);
			});
		}
	});
};

// AUXILIAR FUNCTIONS FOR SAVING A NEW STUDENT - Validation purposes
function createStudentsList(students) {
	if(typeof(students.length)=="undefined") {
		students = [students];
	}
	var studentsToBeInserted = [];
	for( var i=0;i < students.length;i++ ) {
		studentsToBeInserted.push(createNewStudent(students[i]));
	}
	return studentsToBeInserted;
}

function createNewStudent(dumb) {
	var student = {};
	for (key in StudentSkel) {
		if(typeof dumb[key] == 'undefined') {
			// TODO : make a test with the following line of code
			console.log('Parameter doesnt contain all mandatory fields');
			student = null;
			break;
		} else {
			student[key] = dumb[key];
		}
	}
	if(student != null){
		student.created_at = new Date();
	}
	//console.log(student);
	return student;	
}

//find all students
StudentProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, student_collection) {
      if( error ) callback(error)
      else {
        student_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};

//find all students by group
StudentProvider.prototype.findAllByGroupAndType = function(group, callback) {
    this.getCollection(function(error, student_collection) {
      if( error ) callback(error)
      else {
        student_collection.find({'group.number':group.number, 'group.type':group.type}).toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};

//find student by UCID
StudentProvider.prototype.findByUCID = function(ucid, callback) {
    this.getCollection(function(error, student_collection) {
      if( error ) callback(error)
      else {
        student_collection.find({'ucid':ucid}).toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};

StudentProvider.prototype.findByEvaluation = function(ucid, callback) {
    this.getCollection(function(error, student_collection) {
      if( error ) callback(error)
      else {
        student_collection.find({'ucid':ucid}).toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};



//module.exports = StudentProvider;
exports.StudentProvider = StudentProvider;