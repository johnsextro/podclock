var socketio = require('socket.io');
var Podclock = require('./clock.js');

var clients = {};
var socketsOfClients = {};
var clock;
var broadcastInterval;
var hostInterval;

exports.registerSocketEvents = function(server) {
  var io = socketio.listen(server);
  io.sockets.on('connection', function(socket) {
    console.log("io socket connection");
    if (clock != undefined && clock.isClockStarted()) {
      broadcastInterval = setInterval(function() {
        socket.broadcast.emit('timeUpdate', clock.getTime());
      }, 1000);
      socket.emit('hideAllButtons');
    }

    socket.on('startClock', function () {
      if (clock == undefined) {
        clock = new Podclock();
      }
      clock.start();
      hostInterval = setInterval(function() {
        socket.emit('timeUpdate', clock.getTime());
        socket.broadcast.emit('timeUpdate', clock.getTime());
      }, 1000);
      socket.broadcast.emit('hideAllButtons');
    });

    socket.on('pauseClock', function () {
      clock.pause();
    });

    socket.on('resumeClock', function () {
      clock.resume();
    });

    socket.on('resetClock', function () {
      clock.reset();
      socket.emit('timeUpdate', clock.getTime());
      socket.broadcast.emit('timeUpdate', clock.getTime());
      clearInterval(broadcastInterval);
      clearInterval(hostInterval);
    });
  });
}