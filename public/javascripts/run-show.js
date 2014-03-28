var socket;
 
socket = io.connect("http://localhost:3000");

function clockClick() {
  socket.emit('clockClick');
}

function resetClock() {
  socket.emit('resetClock');
  resetAllShowData();
}

function resetAllShowData() {
  $('ol#show-titles').empty();
  $('ol#time-codes').empty();
}

function submitTitleSuggestion() {
  socket.emit('titleSuggested', $('#title-suggestion').val());
  updateTitleSuggestion($('#title-suggestion').val());
  $('#title-suggestion').val('');
}

function updateTitleSuggestion(suggestion) {
  $('#show-titles').append('<li>' + suggestion + '</li>');
}


function updateEventTimeCode(message) {
  $('#time-codes').prepend('<li>' + message + '</li>');
}

function wireLinksToActions() {
  $('#start-link').click(clockClick);
  $('#reset-link').click(resetClock);
  $('#suggest-title').click(submitTitleSuggestion);
  $('#title-suggestion').keypress(function(event) {
    if (event.which == 13) {
      submitTitleSuggestion();
    }
  });
  $('.event_time_code_btn').click( function(event) {
    socket.emit('showEventTimeCode', $(event.target).text());
  });
}

function createHandlersForSocketMessages() {
  socket.on('timeUpdate', function(formattedTime) {
    $('#podclock').text(formattedTime);
  });

  socket.on('addTitleSuggestion', function(data){
    updateTitleSuggestion(data);
  });

  socket.on('resetAllShowData', resetAllShowData);

  socket.on('addEventTimeCode', function(message) {
    updateEventTimeCode(message);
  });
}
 
$(function() {
  createHandlersForSocketMessages();

  wireLinksToActions();

});