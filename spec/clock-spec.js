var clock = require("../controller/clock.js");
 
describe("startTheClock", function () {
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

});    