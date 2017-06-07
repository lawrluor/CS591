var express = require('express');
var router = express.Router();


router.get('/hw1/:word', function(req, res, next) {
    var word = req.params.word;
    res.send('{"string":' + " \"" + word + "\"" + ", " + '"length":' + " \"" + word.length + '\"}');
    next();
});

router.post('/submit', function(req, res, next) {
    var word = req.body.word; // set in body of request
    res.send('{"string":' + " \"" + word + "\"" + ", " + '"length":' + " \"" + word.length + '\"}');
    next();
});

module.exports = router;