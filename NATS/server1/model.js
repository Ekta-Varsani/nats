var mongoose = require('mongoose');
var schema = mongoose.Schema;
var user = new schema({
    username: {type: String, default: ""},
    password: {type: String, default: ""},
   
});

module.exports = mongoose.model('user', user);