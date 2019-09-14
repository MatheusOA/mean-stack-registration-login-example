var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('questions');

var service = {};

service.getById = getById;
service.create = create;
service.delete = _delete;

module.exports = service;


function getById(_id) {
    var deferred = Q.defer();

    db.questions.findById(_id, function (err, question) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (question) {
            // return question
            deferred.resolve(_.omit(question));
        } else {
            // question not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(questionParam) {
    debugger;
    var deferred = Q.defer();

    // validation
    db.questions.findOne(
        { question: questionParam.question },
        function (err, question) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (question) {
                // question already exists
                deferred.reject('Question "' + questionParam.question + '" is already taken');
            } else {
                createQuestion(questionParam);
            }
        });

    function createQuestion(question) {
        db.questions.insert(
            question,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.questions.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}