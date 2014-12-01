var mongoose = require('mongoose');

module.exports = mongoose.model('shows', {
	showNumber: Number,
	podcast: Number,
	notes: String,
	showTitle: String
});