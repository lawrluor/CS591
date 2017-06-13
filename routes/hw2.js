var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Word = require('./wordSchema');

var db = 'mongodb://localhost/words';
mongoose.connect(db);

router.get('/', function(req, res) {
   Word.find({}).exec(function(err, result){
     if (err) {
         res.send('error occurred');
     } else {
         res.json(result);
     }
   });
});

router.get('/words/:word', function(req, res, next) {
    var word = req.params.word;
    Word.findOne({"content": word}).exec(function(err, result){ // execute query
        if (err) {
            res.send('error occurred');
        } else {
            if (result === null) { // If not found, compute length and add item to database
                var newWord = new Word();
                newWord.content = word; // store string
                newWord.length = word.length; // store string length
                newWord.save(function() {
                    console.log(newWord);
                    res.send(newWord); // call this function on save to print, return to client
                });
            } else { // If word found, send first found word
                console.log(result);
                res.json(result);
            }
        }
    });
});

router.post('/post', function(req, res, next) {
    var word = req.body.word; // set in body of request
    if (word === null) {
        res.send("Please provide a word to search for");
    }
    Word.findOne({"content": word}).exec(function(err, result){ // execute query
        if (err) {
            res.send('error occurred');
        } else {
            if (result === null) { // If not found, compute length and add item to database
                var newWord = new Word();
                newWord.content = word; // store string
                newWord.length = word.length; // store string length
                newWord.save(function() {
                    console.log(newWord);
                    res.send(newWord); // call this function on save to print, return to client
                });
            } else { // If word found, send first found word
                console.log(result);
                res.send(result);
            }
        }
    });
});

router.delete('/delete', function(req, res, next) {
   var word = req.body.word;
    if (word === null) {
        res.send("Please provide a word to delete");
    }
    Word.findOneAndRemove({"content": word}).exec(function(err, result) { // execute query
        if (err) {
            res.send('error occurred');
        } else {
            if (result === null) { // no string found, return message
                res.send("String not found")
            } else {
                console.log(result); // string found and successfully deleted, return message
                res.send('Successfully Deleted');
                // res.status(204).send('Successfully Deleted');
            }
        }
    });
});

module.exports = router;