var socketio = require('socket.io');
var Podclock = require('./clock.js');

var clients = {};
var suggestedTitles = [];
var showEventTimeCodes = [];
var showEventButtons = [];
var socketsOfClients = {};
var clock;
var hostInterval;

exports.registerSocketEvents = function(server) {
  var io = socketio.listen(server);
  io.sockets.on('connection', function(socket) {
    if (suggestedTitles.length > 0){
      for (var i = 0; i < suggestedTitles.length; i++) {
        socket.emit('addTitleSuggestion', suggestedTitles[i]);
      };
    }

    if (showEventTimeCodes.length > 0){
      for (var i = 0; i < showEventTimeCodes.length; i++) {
        socket.emit('addEventTimeCode', showEventTimeCodes[i]);
      };
    }

    if (showEventButtons.length > 0){
      for (var i = 0; i < showEventButtons.length; i++) {
        socket.emit('addShowEventButton', showEventButtons[i]);
      };
    }

    socket.on('clockClick', function () {
      if (clock == undefined || !clock.isClockStarted()) {
        clock = new Podclock();
        clock.start();
        hostInterval = setInterval(function() {
          socket.emit('timeUpdate', clock.getTime());
          socket.broadcast.emit('timeUpdate', clock.getTime());
        }, 1000);          
      } else if (clock.isClockPaused()) {
        clock.resume();
      } else if (clock.isClockStarted() && !clock.isClockPaused()) {
        clock.pause();
      } else {
        console.log("Something went wrong");
      }
    });

    socket.on('resetClock', function () {
      if (clock != undefined && clock.isClockStarted()) {
        clock.reset();
        socket.emit('timeUpdate', clock.getTime());
        socket.broadcast.emit('timeUpdate', clock.getTime());
        clearInterval(hostInterval);
      }
      suggestedTitles = [];
      showEventTimeCodes = [];
      socket.broadcast.emit('resetAllShowData');
    });

    socket.on('titleSuggested', function(suggestion) {
      socket.broadcast.emit('addTitleSuggestion', suggestion);
      suggestedTitles.push(suggestion);
    });

    socket.on('showEventTimeCode', function(showEvent) {
      var message = showEvent + " @ " + clock.getTime();
      showEventTimeCodes.push(message);
      socket.emit('addEventTimeCode', message);
      socket.broadcast.emit('addEventTimeCode', message);
    });

    socket.on('addShowEventButton', function(buttonName){
      showEventButtons.push(buttonName);
      socket.broadcast.emit('addShowEventButton', buttonName);
    });

    socket.on('claimHostRole', function() {
      hostId = socket.id;
    });
  });
}