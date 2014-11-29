function addSegment(segment, notes) {
  $('#segment-list').append('<div class="panel panel-default"><h4 class="panel-title panel-heading">' 
  	+ segment + '<span class="glyphicon glyphicon-remove" aria-hidden="true"</span></h4><label>' + notes + '</label></div>');
}

$(function() {

  $('#add-segment').click(function(event) {
    addSegment($('#segment-name').val(), $('#segment-notes').val() );
    $('#segment-name').val('');
    $('#segment-notes').val('');
  });

});