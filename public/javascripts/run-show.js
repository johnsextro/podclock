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
  $('ul#time-codes').empty();
}

function submitTitleSuggestion() {
  var data = {titleSuggestion: $('#title-suggestion').val()}
  $.ajax({type: "PUT",
    contentType: "application/json; charset=utf-8",
    url: "/api/addTitleSuggestion/" + $('#episodeId').val(),
    data: JSON.stringify(data),
    dataType: "json",
    success: function(data) {
      console.log(data.titleSuggestions);
      socket.emit('titleSuggested', $('#title-suggestion').val());
      updateTitleSuggestion($('#title-suggestion').val());
      $('#title-suggestion').val('');
    }
  });
}

function addEventButton() {
  socket.emit('addShowEventButton', $('#event-name').val());
  createEventButton($('#event-name').val());
  $('#event-name').val('');
}

function updateTitleSuggestion(suggestion) {
  $('#show-titles').append('<li>' + suggestion + '</li>');
}

function createEventButton(buttonText) {
  $('#event-buttons').append('<button class="btn btn-default event_time_code_btn">' + buttonText + '</button>');
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
  $('#create-event').click(addEventButton);
  $('#event-name').keypress(function(event) {
    if (event.which == 13) {
      addEventButton();
    }
  });
  $('#event-buttons').delegate('button.event_time_code_btn', 'click', function(event) {
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

  socket.on('addShowEventButton', function(buttonText) {
    createEventButton(buttonText);
  });
}
 
$(function() {
  createHandlersForSocketMessages();

  wireLinksToActions();
});