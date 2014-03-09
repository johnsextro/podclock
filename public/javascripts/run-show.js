var socket;
 
socket = io.connect("http://localhost:3000");
 
$(function() {
 
  socket.on('timeUpdate', function(millis) {
    // console.log(msg);
    x = millis / 1000
	var seconds = Math.floor(x % 60)
	x /= 60
	var minutes = Math.floor(x % 60)
	x /= 60
	var hours = Math.floor(x % 24)
	x /= 24
    $('#podclock').text(hours + ":" + minutes + ":" + seconds);
  });

});