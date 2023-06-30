var mongoose = require('mongoose');
var schema = mongoose.Schema;
var order = new schema({
    orderid: {type: String, default: ""},
    userid: { type: String, default: "" }
});

module.exports = mongoose.model('order', order);