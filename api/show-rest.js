var ShowDB = require('../schema/shows');

exports.show = function(req, res){
	var number = req.param('number');

	shows = ShowDB.find().where('showNumber').equals(number).exec(function(err, shows) {
		if(err)	{
			console.log(err);
		} else {
			res.json(shows[0]);
		}
	});
};

exports.allShows = function(req, res){
	shows = ShowDB.find().sort('-showNumber').exec(function(err, shows) {
		if(err)	{
			console.log(err);
		} else {
			res.json(shows);
		}
	});
};