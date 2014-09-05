var Show = require('../controller/show.js');
var show;

describe("Testing the functionality of the 'Show' module", function () {

	beforeEach(function() {
		show = new Show();
	});

	it("Create a new segment", function() {
		show.createSegment("blah", "Hello everyone");
		var segmentJSON = show.getSegment("blah");
		expect('{"segmentName": "blah", "discussion": "Hello everyone"}').toMatch(segmentJSON);
	});

	it("Create 2 segments and retrieve the first segment", function() {
		show.createSegment("blah", "Hello everyone");
		show.createSegment("2", "abjakdjfik");
		var segmentJSON = show.getSegment("blah");
		expect('{"segmentName": "blah", "discussion": "Hello everyone"}').toMatch(segmentJSON);
	});

	it("Create 2 segments and sure they both exist", function() {
		show.createSegment("blah", "Hello everyone");
		show.createSegment("2", "abjakdjfik");
		var segmentJSON = show.getSegment("blah");
		expect('{"segmentName": "blah", "discussion": "Hello everyone"}').toMatch(segmentJSON);
		segmentJSON = show.getSegment("2");
		expect('{"segmentName": "2", "discussion": "Hello everyone"}').toMatch(segmentJSON);
	});

	it("No duplicate segmentsNames", function() {
		show.createSegment("blah", "Hello everyone");
		show.createSegment("blah", "abjakdjfik");
		var segmentJSON = show.getSegment("blah");
		expect('{"segmentName": "blah", "discussion": "abjakdjfik"}').toMatch(segmentJSON);
	});

	it("Trying to create a segment that exists will update the existing segment", function() {
		show.createSegment("blah", "Hello everyone");
		show.createSegment("blah", "abjakdjfik");
		var segmentJSON = show.getSegment("blah");
		expect('{"segmentName": "blah", "discussion": "abjakdjfik"}').toMatch(segmentJSON);
	});

});