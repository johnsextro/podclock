var mongoose = require('mongoose');

module.exports = mongoose.model('shows', {
	id: Number,
	podcast: Number,
	notes: String 
});