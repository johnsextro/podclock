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

exports.update = function(req, res){
    return ShowDB.findById( req.params.id, function( err, show ) {
        show.showNumber = req.body.showNumber;
		show.podcast = req.body.podcast;
		show.notes = req.body.notes;
		show.showTitle = req.body.showTitle;
		show.segments = req.body.segments;
        return show.save( function( err ) {
            if( !err ) {
                console.log( 'show updated' );
                return res.send( show );
            } else {
                console.log( err );
                return res.send(err.message);
            }
        });
    });
}

exports.create = function(req, res){
    console.log("POST: ");
	console.log(req.body);
	var show = new ShowDB({
		showNumber: req.body.showNumber,
		podcast: req.body.podcast,
		notes: req.body.notes,
		showTitle: req.body.showTitle,
		segments: req.body.segments
	});
	show.save(function (err) {
	if (!err) {
		return console.log("created");
	} else {
		return console.log(err);
	}
	});
	console.log(show);
	return res.send(show);
};