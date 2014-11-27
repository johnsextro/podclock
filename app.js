
/**
 * Module dependencies.
 */

var routes = require('./routes')
  , http = require('http')
  , clockSocket = require('./controller/clock-socket.js')
  , db = require('./db')
  , appBoot = require('./appBoot.js');

var app = appBoot.init();

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
app.get('/podcast/:id', function (req, res) {
  var podcast = req.param('id');
  res.render('myclock', { title: podcast});
});
app.get('/show/:number', routes.show);
app.get('/list', routes.list);
app.get('/create', function(req, res) {
  res.render('create', {title: 'New'});
});

var server = app.listen(3000, function(){
  console.log("Express server listening on port " + app.address().port, app.settings.env);
});

clockSocket.registerSocketEvents(server);
