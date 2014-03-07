var clock = require("../controller/clock.js");
var waiter = require("./waiter.js");

describe("runTheClock", function () {
  it("time should be greater than 0", function () {
	clock.reset();
	clock.start();
	waiter.sleep(5);
	var elapsedTime = clock.getTime();
	expect(elapsedTime).toBeGreaterThan(-1);
  });

  it("if the clock hasn't stated the time returned should be -1", function () {
	clock.reset();
	waiter.sleep(5);
	expect(clock.getTime()).toEqual(-1);
  });

  it("resetting the clock should make time -1", function () {
	clock.reset();
	clock.start();
	waiter.sleep(5);
	clock.reset();
	waiter.sleep(5);
	expect(clock.getTime()).toEqual(-1);
  });

  it("time should always be increasing", function () {
    clock.start();
	waiter.sleep(5);
	var elapsedTime = clock.getTime();
	expect(elapsedTime).toBeGreaterThan(0);
	waiter.sleep(5);
	nextElapsedTime = clock.getTime();
	expect(nextElapsedTime).toBeGreaterThan(elapsedTime);
  });

  it("can not start the clock once started", function () {
	clock.reset();
    clock.start();
	waiter.sleep(5);
	var elapsedTime = clock.getTime();
	expect(elapsedTime).toBeGreaterThan(0);
	clock.start();
	waiter.sleep(5);
	nextElapsedTime = clock.getTime();
	expect(nextElapsedTime).toBeGreaterThan(9);
	expect(nextElapsedTime).toBeGreaterThan(elapsedTime);
  });

  it("able to pause the clock", function () {
   	clock.reset();
	
	clock.start();
	waiter.sleep(5)
	clock.pause();
	waiter.sleep(5);
	expect(clock.getTime()).toBeLessThan(10);
  });

  it("able to pause and resume the clock", function () {
   	clock.reset();
	
	clock.start();
	waiter.sleep(5)
	clock.pause();
	waiter.sleep(5);
	clock.resume();
	expect(clock.getTime()).toBeLessThan(10);
  });
});    