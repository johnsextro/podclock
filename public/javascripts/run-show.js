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
  socket.emit('titleSuggested', $('#title-suggestion').val());
  updateTitleSuggestion($('#title-suggestion').val());
  $('#title-suggestion').val('');
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

function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
    // Update the app to reflect a signed in user
    // Hide the sign-in button now that the user is authorized, for example:
    document.getElementById('signinButton').setAttribute('style', 'display: none');
    gapi.client.load('plus','v1', function(){
     var request = gapi.client.plus.people.get({
       'userId': 'me'
     });
     request.execute(function(resp) {
       $('#displayName').text(resp.displayName);
     });
    });
  } else {
    // Update the app to reflect a signed out user
    // Possible error values:
    //   "user_signed_out" - User is signed-out
    //   "access_denied" - User denied access to your app
    //   "immediate_failed" - Could not automatically log in the user
    console.log('Sign-in state: ' + authResult['error']);
  }

}
 
$(function() {
  createHandlersForSocketMessages();

  wireLinksToActions();

  var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
  po.src = 'https://apis.google.com/js/client:plusone.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
});