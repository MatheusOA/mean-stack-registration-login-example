var config = require('config.json');
var express = require('express');
var router = express.Router();
var questionService = require('services/question.service');

// routes
router.post('/create', createQuestion);
router.get('/current', getCurrentQuestion);
router.delete('/:_id', deleteQuestion);

module.exports = router;

function createQuestion(req, res) {
    questionService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrentQuestion(req, res) {
    questionService.getById(req.session.questionId)
        .then(function (question) {
            if (question) {
                res.send(question);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


function deleteQuestion(req, res) {
    var questionId = req.session.questionId;
    if (req.params._id !== questionId) {
        // can only delete own account
        return res.status(401).send('You can only delete your own account');
    }

    questionService.delete(questionId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}