function addSegment(segment, notes) {
  $('#segment-list').append('<div class="panel panel-default"><h4 class="panel-title panel-heading">' 
  	+ segment + '<span class="col-md-offset-10"><span class="glyphicon glyphicon-remove" aria-hidden="true"</span>' 
  	+ '<span class="glyphicon glyphicon-arrow-up" aria-hidden="true"</span>' 
  	+ '<span class="glyphicon glyphicon-arrow-down" aria-hidden="true"</span></span></h4><label>' 
  	+ notes + '</label></div>');
}

function saveNotes() {
  var segments = [{
    name: 'Tweet shoutouts', notes: 'First tweet', position: 1},
    {name: 'Discussion', notes: 'Topic', position: 2}];
  var showData = {showNumber: $('#showNumber').val(), podcast: 1, notes: "Default Notes", showTitle: $('#episodeTitle').val(), segments: segments};
  $.ajax({type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "/api/createshow",
    data: JSON.stringify(showData),
    dataType: "json",
    success: function(data) {
      $('#successMessage').show();
      $('#successMessage').fadeOut(6000, function(){});
      $('#segment-name').focus();
    }
  });
}

$(function() {
  $('#successMessage').hide();
  $('#add-segment').click(function(event) {
    addSegment($('#segment-name').val(), $('#segment-notes').val() );
    $('#segment-name').val('');
    $('#segment-notes').val('');
  });

  $('#save').click(saveNotes);

});