
/**
 * Module dependencies.
 */

var routes = require('./routes')
  , http = require('http')
  , clockSocket = require('./controller/clock-socket.js')
  , db = require('./db')
  , appBoot = require('./appBoot.js')
  , showrest = require('./api/show-rest');

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
app.get('/podcast/:id', routes.show);
app.get('/episode', function(req, res) {
  res.render('create', {title: 'New'});
});
app.get('/episode/:episodeId', function(req, res) {
  res.render('create', {title: 'Episode', episodeId: req.param('episodeId')});
});

// REST Routes for the API
app.get('/api/show/:id', showrest.show);
app.get('/api/allshows', showrest.allShows);
app.post('/api/createshow', showrest.create);
app.put('/api/updateshow/:id', showrest.update);

var server = app.listen(3000, function(){
  console.log("Express server listening on port " + app.address().port, app.settings.env);
});

clockSocket.registerSocketEvents(server);
