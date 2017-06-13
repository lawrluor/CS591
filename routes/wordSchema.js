var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wordSchema = new Schema({
    // content: {
    //     type: String,
    //     required: true
    // },
    content: String,
    length: Number
});

module.exports = mongoose.model('Word', wordSchema);