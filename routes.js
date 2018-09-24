'use strict';

var express = require('express');
var router = express.Router();
var Question =  require("./models").Question;

router.param("qid", function(req, res, next, id) {
		Question.findById(id, function(err, doc){
		if(err) return next(err);
		if(!doc) {
			err = new Error("Not Found");
			err.status = 404;
			return next(err);
		}
		req.question = doc;
		return next();
	});
});

router.param("aid", function(req, res, next, id) {
	req.answer = req.question.answers.id(id);
	if(!req.answer) {
			var err = new Error("Not Found");
			err.status = 404;
			return next(err);
		}
	next();
});




// GET /quetions
router.get("/", function(req, res, next) {
	// Question.find({}, null, {sort: {createdAt: -1}}, function(err, questions) {
	// 	if(err) return next(err);
	// 	res.json(questions);
	// });

	Question.find({})
		.sort({createdAt: -1})
			.exec(function(err, questions) {
				if(err) return next(err);
				res.json(questions);
	});

	// res.json({response: "It's a GET request"});
});

// POST /quetions
router.post("/", function(req, res, next) {
	var question = new Question(req.body);
	question.save(function(err, question){
		if(err) return next(err);
		res.status(201);
		res.json(question);
	});

	// res.json({
	// 	response: "It's POST request",
	// 	body: req.body
	// });
});

router.get("/:qid", function(req, res, next) {
	// Question.findById(req.params.qid, function(err, doc){
	// 	if(err) return next(err);
	// 	res.json(doc);
	// });

		res.json(req.question);

	// res.json({
	// 	response: "It's GET request for ID"
	// });
});

router.post("/:qid/answers", function(req, res, next) {
	req.question.answers.push(req.body);
	req.question.save(function(err, question){
		if(err) return next(err);
		res.status(201);
		res.json(question);
	});

	// res.json({
	// 	response: "It's POST request for /answers",
	// 	questionID: req.params.qid,
	// 	body: req.body});
});

router.put("/:qid/answers/:aid", function(req, res, next) {
	req.answer.update(req.body, function(err, result){
		if(err) return next(err);
		res.json(result);
	});
	// res.json({
	// 	response: "It's a PUT request to /answers",
	// 	questionID: req.params.qid,
	// 	answerID: req.params.aid,
	// 	body: req.body
	// });
});

router.delete("/:qid/answers/:aid", function(req, res, next) {
	req.answer.remove(function(err){
		req.question.save(function(err, question){
			if(err) return next(err);
			res.json(question);
		});
	});


	// res.json({
	// 	response: "It's a DELETE request to /answers",
	// 	questionID: req.params.qid,
	// 	answerID: req.params.aid
	// });
});

router.post("/:qid/answers/:aid/vote-:dir", function(req, res, next) {
    if (req.params.dir.search(/^(up|down)$/) === -1) {
        var err = new Error("Not Found");
        err.status = 404;
        next(err);
    } else {
        req.vote = req.params.dir;
        next();
    }
}, function(req, res, next) {
    req.answer.vote(req.vote, function(err, question) {
        if (err) return next(err);
        res.json(question);
    });



    // res.json({
    //     response: "It's a POST request to /vote",
    //     questionID: req.params.qid,
    //     answerID: req.params.aid,
    //     vode: req.params.dir
    // });
});


module.exports = router;

