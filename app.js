
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , socketio = require('socket.io')
  , http = require('http');

var app = module.exports = express.createServer();
var Podclock = require('./controller/clock.js');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
app.use(express.compiler({ src : __dirname + '/public', enable: ['less']}));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Compatible

// Now less files with @import 'whatever.less' will work(https://github.com/senchalabs/connect/pull/174)
var TWITTER_BOOTSTRAP_PATH = './vendor/twitter/bootstrap/less';
express.compiler.compilers.less.compile = function(str, fn){
  try {
    var less = require('less');var parser = new less.Parser({paths: [TWITTER_BOOTSTRAP_PATH]});
    parser.parse(str, function(err, root){fn(err, root.toCSS());});
  } catch (err) {fn(err);}
}

// Routes

app.get('/', routes.index);
app.get('/myclock', function(req, res){
  res.render('myclock', { title: 'Podclock' })
});

// app.listen(3000, function(){
//   console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
// });

var server = app.listen(3000, function(){
  console.log("Express server listening on port " + app.address().port, app.settings.env);
});

var io = socketio.listen(server);
var clients = {};
 
var socketsOfClients = {};
io.sockets.on('connection', function(socket) {
  console.log("io socket connection");
  var clock = new Podclock();
  clock.start();
  setInterval(function() {
    socket.emit('timeUpdate', clock.getTime());
    console.log(clock.getTime());
  }, 1000);
});
