var segments = [];
var episodeId = '';

function addSegment(segment, notes) {
  var segmentNumber = segments.length + 1;
  var randomId = createRandomId();
  var segDivId = 'seg' + randomId;
  var headingId = 'heading' + randomId;
  var removeSegId = 'remove-seg' + randomId;
  $('#segment-list').append('<div id=' + segDivId + ' class="panel panel-default"></div>');
  $('#' + segDivId).append('<h4 id=' + headingId + ' class="panel-title panel-heading"></h4>');
  $('#' + headingId).append('<span class="pull-left"><button type="button" class="btn btn-link"><span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span></button>');
  $('#' + headingId).append('<button type="button" class="btn btn-link"><span id=down' + randomId + ' class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span></span>');
  $('#' + headingId).append('<span>' + segment + '</span>');
  $('#' + headingId).append('<button type="button" class="btn btn-link pull-right"><span id=' + removeSegId + ' class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>');
  $('#' + segDivId).append('<label>' + notes + '</label>');
  segments.push({name: segment, notes: notes, position: segmentNumber, pageId: randomId});
  $('#' + removeSegId).click({segmentId: randomId}, removeSegment);
  $('#down' + randomId).click({segmentId: randomId}, moveDown);
}

function saveNotes() {
  var showData = {showNumber: $('#showNumber').val(), podcast: 1, notes: "Default Notes", showTitle: $('#episodeTitle').val(), segments: segments};
  if (episodeId == ''){
    $.ajax({type: "POST",
      contentType: "application/json; charset=utf-8",
      url: "/api/createshow",
      data: JSON.stringify(showData),
      dataType: "json",
      success: function(data) {
        episodeId = data._id;
        $('#successMessage').show();
        $('#successMessage').fadeOut(6000, function(){});
        $('#segment-name').focus();
      }
    });
  } else {
    $.ajax({type: "PUT",
      contentType: "application/json; charset=utf-8",
      url: "/api/updateshow/" + episodeId,
      data: JSON.stringify(showData),
      dataType: "json",
      success: function(data) {
        $('#successMessage').show();
        $('#successMessage').fadeOut(6000, function(){});
        $('#segment-name').focus();
      }
    });    
  }
}

function removeSegment(event) {
  var segmentId = event.data.segmentId;
  for (var i = 0; i < segments.length; i++) {
    if (segments[i].pageId == segmentId) {
      segments.splice(i, 1);
    }
  }
  $('#seg' + segmentId).remove();
}

function moveDown(event) {
  var segmentId = event.data.segmentId;
  console.log(segmentId);
  console.log($('.segment-list div').get());
}

function loadEpisode(episode){
  $('#showNumber').val(episode.showNumber);
  $('#episodeTitle').val(episode.showTitle);
}

function createRandomId() {
  var hash = 0, i, chr, len;
  var current_date = new Date().toString()
  if (current_date.length == 0) return hash;
  for (i = 0, len = current_date.length; i < len; i++) {
    chr   = current_date.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

$(function() {
  $('#successMessage').hide();
  $('#add-segment').click(function(event) {
    addSegment($('#segment-name').val(), $('#segment-notes').val() );
    $('#segment-name').val('');
    $('#segment-notes').val('');
  });
  $('#save').click(saveNotes);
  if ($('#episodeId').val() != ''){
    episodeId = $('#episodeId').val();
    $.ajax({type: "GET",
      contentType: "application/json; charset=utf-8",
      url: "/api/show/" + episodeId,
      success: function(data) {
        loadEpisode(data);
      }
    });
  }
});