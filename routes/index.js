
/*
 * GET home page.
 */

var ShowDB = require('../schema/shows');

exports.show = function(req, res){
	var id = req.param('id');

	ShowDB.findById(id, function(err, show) {
		if(err)	{
			console.log(err);
		} else {
			res.render('myclock', {title: 'Podclock', show: show});
		}
	});

};

exports.index = function(req, res){
	shows = ShowDB.find().sort('-showNumber').exec(function(err, shows) {
		if(err)	{
			console.log(err);
		} else {
			res.render('index', {title: 'Podclock', shows: shows});
		}
	});	
};