var socket;
 
socket = io.connect("http://localhost:3000");

function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}

function startClock() {
  socket.emit('startClock');
}

function pauseClock() {
  socket.emit('pauseClock');
}

function resumeClock() {
  socket.emit('resumeClock');
}

function wireLinksToActions() {
  $('#start-link').click(startClock);
  $('#pause-link').click(pauseClock);
  $('#resume-link').click(resumeClock);
}

function createHandlersForSocketMessages() {
  socket.on('timeUpdate', function(millis) {
    x = millis / 1000
  var seconds = pad(Math.floor(x % 60),2);
  x /= 60
  var minutes = pad(Math.floor(x % 60),2);
  x /= 60
  var hours = pad(Math.floor(x % 24),2);
  x /= 24
    $('#podclock').text(hours + ":" + minutes + ":" + seconds);
  });
}
 
$(function() {
  createHandlersForSocketMessages();

  wireLinksToActions();

});