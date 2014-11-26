
/*
 * GET home page.
 */

var ShowDB = require('../schema/shows');

exports.show = function(req, res){
	var number = req.param('number');

	if (typeof shows[number] === 'undefined') {
		res.status(404).json({status: 'error'});
	} else {
		res.json(shows[number].getInformation());
	}

};

exports.index = function(req, res){
	res.render('index', {title: 'Podclock'});
};

exports.list = function(req, res) {
	shows = ShowDB.find().exec(function(err, shows) {
		if(err)	{
			console.log(err);
		} else {
			res.render('listshows', {title: 'Shows', shows: shows});
		}
	}); 
};