
/*
 * GET home page.
 */

var ShowDB = require('../schema/shows');

exports.show = function(req, res){
	var number = req.param('number');

	shows = ShowDB.find().where('showNumber').equals(number).exec(function(err, shows) {
		if(err)	{
			console.log(err);
		} else {
			res.render('notes', {title: 'Notes', show: shows[0]});
		}
	});

};

exports.index = function(req, res){
	shows = ShowDB.find().sort('-showNumber').exec(function(err, shows) {
		if(err)	{
			console.log(err);
		} else {
			res.render('index', {title: 'Shows', shows: shows});
		}
	});	
};

exports.list = function(req, res) {
	shows = ShowDB.find().sort('-showNumber').exec(function(err, shows) {
		if(err)	{
			console.log(err);
		} else {
			res.render('listshows', {title: 'Shows', shows: shows});
		}
	}); 
};