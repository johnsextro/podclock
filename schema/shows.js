var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var segments = new Schema({
	name: {type: String},
	notes: {type: String},
	position: {type: Number}
});

module.exports = mongoose.model('shows', {
	showNumber: Number,
	podcast: Number,
	notes: String,
	showTitle: String,
	segments: [segments]
});