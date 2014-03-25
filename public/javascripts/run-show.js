var socket;
 
socket = io.connect("http://localhost:3000");

function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}

function startClock() {
  socket.emit('startClock');
  $('#start-link').click(pauseClock);
}

function resetClock() {
  socket.emit('resetClock');
  resetAllShowData();
}

function pauseClock() {
  socket.emit('pauseClock');
  $('#start-link').click(resumeClock);
}

function resumeClock() {
  socket.emit('resumeClock');
  $('#start-link').click(pauseClock);
}

function resetAllShowData() {
  $('ol#show-titles').empty();
}

function submitTitleSuggestion() {
  socket.emit('titleSuggested', $('#title-suggestion').val());
  updateTitleSuggestion($('#title-suggestion').val());
  $('#title-suggestion').val('');
}

function updateTitleSuggestion(suggestion) {
  $('#show-titles').append('<li>' + suggestion + '</li>');
}

function wireLinksToActions() {
  $('#start-link').click(startClock);
  $('#reset-link').click(resetClock);
  $('#suggest-title').click(submitTitleSuggestion);
  $('#title-suggestion').keypress(function(event) {
    if (event.which == 13) {
      submitTitleSuggestion();
    }
  });
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

  socket.on('addTitleSuggestion', function(data){
    addTitleSuggestion(data);
  });

  socket.on('resetAllShowData', resetAllShowData);
}
 
$(function() {
  createHandlersForSocketMessages();

  wireLinksToActions();

});