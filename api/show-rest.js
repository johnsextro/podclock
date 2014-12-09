var ShowDB = require('../schema/shows');

exports.show = function(req, res){
	var id = req.param('id');

	ShowDB.findById(id, function(err, show) {
		if(err)	{
			console.log(err);
		} else {
			res.json(show);
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
};

exports.create = function(req, res){
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
	return res.send(show);
};

exports.addTitleSuggestion = function(req, res){
    return ShowDB.findById( req.params.id, function( err, show ) {
		show.titleSuggestions.push(req.body.titleSuggestion);
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
};