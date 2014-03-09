var socket;
 
socket = io.connect("http://localhost:3000");
 
$(function() {
 
  socket.on('timeUpdate', function(msg) {
    console.log(msg);
  });

});