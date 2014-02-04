var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

EvaluationProvider = function(host, port) {
  this.db = new Db('node-mongo-evaluation', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};


EvaluationProvider.prototype.getCollection = function(callback) {
  this.db.collection('evaluations', function(error, evaluation_collection) {
    if( error ) callback(error);
    else callback(null, evaluation_collection);
  });
};

//find all evaluations
EvaluationProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, evaluation_collection) {
      if( error ) callback(error)
      else {
        evaluation_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};

//save new evaluation
EvaluationProvider.prototype.save = function(evaluations, callback) {
    this.getCollection(function(error, evaluation_collection) {
      if( error ) callback(error)
      else {
        if( typeof(evaluations.length)=="undefined" )
          evaluations = [evaluations];

        for( var i =0;i< evaluations.length;i++ ) {
          evaluation = evaluations[i];
          evaluation.created_at = new Date();
        }

        evaluation_collection.insert(evaluations, function() {
          callback(null, evaluations);
        });
      }
    });
};

//find all members per team number
EvaluationProvider.prototype.findAllMembersPerTeam = function(team, callback) {
	//TODO
};


exports.EvaluationProvider = EvaluationProvider;