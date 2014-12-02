var segments = [];

function addSegment(segment, notes) {
  $('#segment-list').append('<div class="panel panel-default"><h4 class="panel-title panel-heading">' 
  	+ '<span class="pull-left"><span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>&nbsp;' 
    + '<span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span></span>&nbsp;'
    + '<span>' + segment + '</span>'
  	+ '<span class="glyphicon glyphicon-trash pull-right" aria-hidden="true"></span></h4>'
    + '<label>' + notes + '</label></div>');
  segments.push({name: segment, notes: notes, position: segments.length + 1});
}

function saveNotes() {
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