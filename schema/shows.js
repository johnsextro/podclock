var mongoose = require('mongoose');

module.exports = mongoose.model('shows', {
	id: Number,
	showNumber: Number,
	podcast: Number,
	notes: String 
});