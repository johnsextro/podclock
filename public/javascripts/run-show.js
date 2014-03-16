var socket;
 
socket = io.connect("http://localhost:3000");

function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}

function startClock() {
  socket.emit('startClock');
  $('#start-link').hide();
  $('#pause-link').show();
}

function resetClock() {
  socket.emit('resetClock');
  $('#start-link').show();
  $('#pause-link').hide();
  $('#resume-link').hide();
}

function pauseClock() {
  socket.emit('pauseClock');
  $('#pause-link').hide();
  $('#resume-link').show();
}

function resumeClock() {
  socket.emit('resumeClock');
  $('#resume-link').hide();
  $('#pause-link').show();
}

function wireLinksToActions() {
  $('#start-link').click(startClock);
  $('#reset-link').click(resetClock);
  $('#pause-link').click(pauseClock).hide();
  $('#resume-link').click(resumeClock).hide();
}

function hideAllButtons() {
  $('#start-link').hide();
  $('#reset-link').hide();
  $('#pause-link').hide();
  $('#resume-link').hide();
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

  socket.on('hideAllButtons', hideAllButtons); 
}
 
$(function() {
  createHandlersForSocketMessages();

  wireLinksToActions();

});