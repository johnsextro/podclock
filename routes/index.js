
/*
 * GET home page.
 */

var show = require('../show');

var show1 = show({
	id: '101',
	showNumber: '10',
	podcast: 'This Agile Life',
	notes: 'My show notes'
});

var show2 = show({
	id: '102',
	showNumber: '11',
	podcast: 'This Agile Life',
	notes: 'My show notes for show 2'
});

var shows = [];
shows[0] = show1;
shows[1] = show2;

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
	res.render('listshows', {title: 'Shows', shows: shows});
};