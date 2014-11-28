function addSegment(segment, notes) {
  $('#segment-list').append('<div class="panel panel-default"><label>' 
  	+ segment + '</label><br/><label>' + notes + '</label>');
}

$(function() {

  $('#add-segment').click(function(event) {
    addSegment($('#segment-name').val(), $('#segment-notes').val() );
    $('#segment-name').val('');
    $('#segment-notes').val('');
  });

});