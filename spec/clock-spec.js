var clock = require("../controller/clock.js");
var clock2 = require("../controller/clock.js");
 
describe("runTheClock", function () {
  it("time should be greater than 0", function () {
	clock.start();
	var elapsedTime = clock.getTime();
	setTimeout( function() {
		expect(elapsedTime).toBeGreaterThan(0);
	}, 10);
  });

  it("time should always be increasing", function () {
    clock.start();
	var elapsedTime = clock.getTime();
	setTimeout( function() {
		expect(elapsedTime).toBeGreaterThan(0);
	}, 10);
	nextElapsedTime = clock.getTime();
	setTimeout( function() {
		expect(nextElapsedTime).toBeGreaterThan(elapsedTime);
	}, 10);
  });

  it("can not start the clock once started", function () {
    clock.start();
	var elapsedTime = clock.getTime();
	setTimeout( function() {
		expect(elapsedTime).toBeGreaterThan(0);
	}, 10);
	clock.start();
	nextElapsedTime = clock.getTime();
	setTimeout( function() {
		expect(nextElapsedTime).toBeGreaterThan(elapsedTime);
	}, 10);
  });

  it("able to create 2 clocks", function () {
    clock.start();
	setTimeout( function() {
		clock2.start();
		expect(clock1.getTime()).toBeGreaterThan(clock2.getTime());
	}, 10);
  });

});    