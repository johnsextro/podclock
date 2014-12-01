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

exports.create = function(req, res){
    console.log("POST: ");
	console.log(req.body);
	var show = new ShowDB({
		showNumber: req.body.showNumber,
		podcast: req.body.podcast,
		notes: req.body.notes,
		showTitle: req.body.showTitle
	});
	show.save(function (err) {
	if (!err) {
		return console.log("created");
	} else {
		return console.log(err);
	}
	});
	return res.send(show);
};