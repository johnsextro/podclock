express = require('express');

exports.init = function() {
	var app = module.exports = express.createServer();

	// Configuration

	app.configure(function(){
	  app.set('views', __dirname + '/views');
	  app.set('view engine', 'jade');
	  app.set('view options', {layout: false});
	  app.use(express.bodyParser());
	  app.use(express.methodOverride());
	  app.use(express.compiler({ src : __dirname + '/public', enable: ['less']}));
	  app.use(app.router);
	  app.use(express.static(__dirname + '/public'));
	});

	app.configure('development', function(){
	  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	  app.use(express.logger('dev'));
	});

	app.configure('test', function(){
	  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	  app.use(express.logger('short'));
	});

	app.configure('production', function(){
	  app.use(express.errorHandler());
	  app.use(express.logger('tiny'));
	});

	return app;
}