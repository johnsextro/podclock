var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/podclock');

module.exports = mongoose.connection;