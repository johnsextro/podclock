var Podclock = require('../controller/clock.js');
var clock = new Podclock();
var waiter = require("./waiter.js");

describe("runTheClock", function () {
  it("after starting the clock, time should be greater than 0", function () {
	clock.reset();
	clock.start();
	waiter.sleep(5);
	var elapsedTime = clock.getMillis();
	expect(elapsedTime).toBeGreaterThan(0);
  });

  it("check if the clock is started", function () {
	clock.reset();
	clock.start();
	waiter.sleep(5);
	expect(clock.isClockStarted()).toBeTruthy();
  });

  it("if the clock hasn't stated the time returned should be 0", function () {
	clock.reset();
	waiter.sleep(5);
	expect(clock.getMillis()).toEqual(0);
	expect(clock.isClockStarted()).toBeFalsy();
  });

  it("resetting the clock should make time 0", function () {
	clock.reset();
	clock.start();
	waiter.sleep(5);
	clock.reset();
	waiter.sleep(5);
	expect(clock.getMillis()).toEqual(0);
  });

  it("after starting the clock, time should always be increasing", function () {
    clock.start();
	waiter.sleep(5);
	var elapsedTime = clock.getMillis();
	expect(elapsedTime).toBeGreaterThan(0);
	waiter.sleep(5);
	nextElapsedTime = clock.getMillis();
	expect(nextElapsedTime).toBeGreaterThan(elapsedTime);
  });

  it("can only start the clock once", function () {
	clock.reset();
    clock.start();
	waiter.sleep(5);
	var elapsedTime = clock.getMillis();
	expect(elapsedTime).toBeGreaterThan(0);
	clock.start();
	waiter.sleep(5);
	nextElapsedTime = clock.getMillis();
	expect(nextElapsedTime).toBeGreaterThan(9);
	expect(nextElapsedTime).toBeGreaterThan(elapsedTime);
  });

  it("able to pause the clock", function () {
   	clock.reset();
	
	clock.start();
	waiter.sleep(5)
	clock.pause();
	waiter.sleep(5);
	expect(clock.getMillis()).toBeLessThan(10);
  });

  it("trying to pause the clock once paused has no effect", function () {
   	clock.reset();
	
	clock.start();
	waiter.sleep(5)
	clock.pause();
	waiter.sleep(5);
	expect(clock.getMillis()).toBeLessThan(10);
	clock.pause();
	waiter.sleep(5);
	expect(clock.getMillis()).toBeLessThan(10);
	clock.resume();
	waiter.sleep(5);
	expect(clock.getMillis()).toBeGreaterThan(9);
  });

  it("pausing before starting the clock has no effect", function () {
   	clock.reset();
	
	clock.pause();
	waiter.sleep(5);
	expect(clock.getMillis()).toEqual(0);
  });

  it("able to pause and resume the clock", function () {
   	clock.reset();
	
	clock.start();
	waiter.sleep(5)
	clock.pause();
	waiter.sleep(5);
	clock.resume();
	expect(clock.getMillis()).toBeLessThan(10);
  });

  it("resuming before starting the clock has no effect", function () {
   	clock.reset();
	
	clock.resume();
	waiter.sleep(5)
	expect(clock.getMillis()).toEqual(0);
  });

  it("resuming without a pause has no effect", function () {
   	clock.reset();
	
	clock.start();
	waiter.sleep(5)
	clock.resume();
	waiter.sleep(5)
	expect(clock.getMillis()).toBeGreaterThan(9);
  });

  it("able to pause/resume more than once", function () {
   	clock.reset();
	
	clock.start();
	waiter.sleep(5)
	clock.pause();
	waiter.sleep(5);
	clock.resume();
	waiter.sleep(5)
	clock.pause();
	waiter.sleep(5);
	clock.resume();
	expect(clock.getMillis()).toBeLessThan(12);
  });

  it("clock is a prototype that can be constructed more than once", function () {
   	clock.reset();
	
	clock.start();
	waiter.sleep(5);
	var secondClock = new Podclock();
	secondClock.start();
	waiter.sleep(5)
	expect(clock.getMillis()).toBeGreaterThan(secondClock.getMillis());
  });

});    