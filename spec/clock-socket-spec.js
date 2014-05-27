var io = require('socket.io-client');
var clockSocket = require('../controller/clock-socket.js');
var waiter = require("./waiter.js");
var appBoot = require('../appBoot.js');
var clockSocket = require('../controller/clock-socket.js');

describe("test the clock socket events", function () {

	var socket;
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

	    socket = io.connect('http://localhost:3000', {
	        'reconnection delay' : 0
	        , 'reopen delay' : 0
	        , 'force new connection' : true
	    });
	    cohost = io.connect('http://localhost:3000', {
	        'reconnection delay' : 0
	        , 'reopen delay' : 0
	        , 'force new connection' : true
	    });
	    socket.on('connect', function() {
	        console.log('host connected...');
	        done();
	    });
	    cohost.on('connect', function() {
	        console.log('cohost connected...');
	        done();
	    });
	    socket.on('disconnect', function() {
	        console.log('host disconnected...');
	    })
	    cohost.on('disconnect', function() {
	        console.log('cohost disconnected...');
	    })
	});

	afterEach(function(done) {
	    // Cleanup
	    if(socket.socket.connected) {
	        console.log('disconnecting host...');
	        socket.emit('resetClock');
	        socket.disconnect();
	        done();
	    } else {
	        // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
	        console.log('no connection to break...');
	    }
	    if(cohost.socket.connected) {
	        console.log('disconnecting cohost...');
	        cohost.disconnect();
	        done();
	    } else {
	        // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
	        console.log('no connection to break...');
	    }
	    server.close();
	    done();
	});

	it("ensure client is getting time updates", function(done) {
		socket.on('timeUpdate', function(runningTime) {
			expect(runningTime).toMatch("00:00:01");
			done();
		});
		socket.emit('clockClick');
	});

	it("testing communication of title suggestions", function (done) {
		cohost.on('addTitleSuggestion', function(data) {
			expect(data).toMatch('test title suggestion');
			done();	
		});
		socket.emit('titleSuggested', 'test title suggestion');
	});

	it("testing notification to add an event button", function (done) {
		cohost.on('addShowEventButton', function(data) {
			expect(data).toMatch('test button name');
			done();	
		});
		socket.emit('addShowEventButton', 'test button name');
	});

});    