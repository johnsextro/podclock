var io = require('socket.io-client');
var clockSocket = require('../controller/clock-socket.js');
var waiter = require("./waiter.js");

describe("test the clock socket events", function () {

	var socket;
	var cohost;

	beforeEach(function(done) {
	    // Setup
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
	    cohost.on('addTitleSuggestion', function(data) {
			console.log("Title is " + data);
			expect(data).toEqual('wrongtest title suggestion');
			done();	
		});
	    socket.on('disconnect', function() {
	        console.log('host disconnected...');
	    })
	    cohost.on('disconnect', function() {
	        console.log('cohost disconnected...');
	    })
	});

	// afterEach(function(done) {
 //        // Cleanup
 //        if(socket.socket.connected) {
 //            console.log('disconnecting...');
 //            socket.disconnect();
 //            cohost.disconnect();
 //        } else {
 //            // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
 //            console.log('no connection to break...');
 //        }
 //        done();
 //    });

	it("connect to this socket event handler", function () {
		socket.emit('titleSuggested', 'test title suggestions');
	});

});    