var io = require('socket.io-client');
var clockSocket = require('../controller/clock-socket.js');
var waiter = require("./waiter.js");
var appBoot = require('../appBoot.js');
var clockSocket = require('../controller/clock-socket.js');

describe("test the clock socket events", function () {

	var host;
	var cohost;
	var server;

	beforeEach(function(done) {
	    // Setup
	    var app = appBoot.init();
	    server = app.listen(3000, function(){
		  console.log("Express server listening on port " + app.address().port, app.settings.env);
		  done();
		});
		clockSocket.registerSocketEvents(server);

	    host = io.connect('http://localhost:3000', {
	        'reconnection delay' : 0
	        , 'reopen delay' : 0
	        , 'force new connection' : true
	    });
	    cohost = io.connect('http://localhost:3000', {
	        'reconnection delay' : 0
	        , 'reopen delay' : 0
	        , 'force new connection' : true
	    });
	    host.on('connect', function() {
	        done();
	    });
	    cohost.on('connect', function() {
	        done();
	    });
	    host.on('disconnect', function() {
	        done();
	    });
	    cohost.on('disconnect', function() {
	        done();
	    });
	    host.emit('claimHostRole');
	});

	afterEach(function(done) {
	    // Cleanup
	    if(host.socket.connected) {
	        host.emit('resetClock');
	        host.disconnect();
	        done();
	    } else {
	        // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
	        console.log('no connection to break...');
	    }
	    if(cohost.socket.connected) {
	        cohost.disconnect();
	        done();
	    }
	    server.close();
	    done();
	});

	it("host starts the clock and begins getting clock updates", function(done) {
		host.on('timeUpdate', function(runningTime) {
			expect(runningTime).toMatch("00:00:01");
			done();
		});
		host.emit('clockClick');
	});

	it("host resets the clock and cohost receives reset event", function(done) {
		cohost.on('resetAllShowData', function() {
			expect(true).toBeTruthy();
			done();
		});
		host.emit('resetClock');
	});

	it("host suggests a title and cohost receives title suggestion", function (done) {
		cohost.on('addTitleSuggestion', function(data) {
			expect(data).toMatch('test title suggestion');
			done();	
		});
		host.emit('titleSuggested', 'test title suggestion');
	});

	it("cohost suggests a title and host receives title suggestion", function (done) {
		host.on('addTitleSuggestion', function(data) {
			expect(data).toMatch('test title suggestion');
			done();	
		});
		cohost.emit('titleSuggested', 'test title suggestion');
	});

	it("host creates a new event button and cohost receives add button event", function (done) {
		cohost.on('addShowEventButton', function(data) {
			expect(data).toMatch('test button name');
			done();	
		});
		host.emit('addShowEventButton', 'test button name');
	});

	it("host logs event and event is sent to host and cohost", function (done) {
		cohost.on('addEventTimeCode', function(data) {
			expect(data).toContain('test time code @');
			done();	
		});
		host.on('addEventTimeCode', function(data) {
			expect(data).toContain('test time code @');
			done();	
		});
		host.emit('clockClick');
		waiter.sleep(1);
		host.emit('showEventTimeCode', 'test time code');
	});

	// it("only the host can start the clock", function (done) {
	// 	cohost.on('notHost', function(message) {
	// 		expect(true).toBeTruthy();
	// 		done();
	// 	});
	// 	cohost.emit('clockClick');
	// });

	// it("only the host can reset the clock", function (done) {
	// 	cohost.on('notHost', function(message) {
	// 		expect(true).toBeTruthy();
	// 		done();
	// 	});
	// 	cohost.on('timeUpdate', function(runningTime) {
	// 		expect(runningTime).toNotMatch("00:00:00");
	// 		done();
	// 	});
	// 	host.emit('clockClick');
	// 	waiter.sleep(1);
	// 	cohost.emit('resetClock');
	// });
});    