const hb = require('express-handlebars'),
	express = require('express'),
	fs = require('fs'),
	http = require('http');

process.on('uncaughtException', (err) => {
	console.error((new Date()).toUTCString() + ' uncaughtException:', err.message);
  	console.error(err.stack);
  	process.exit(1);
});

var core = require('./lib/core');

express.static.mime.define({'application/javascript': ['js']});
var app = express();
app.use(express.static(__dirname + '/dist/assets/'));

var handlebars = hb.create({
	extname: ".html",
	defaultLayout: "index",
	layoutsDir: __dirname+'/dist/views/layouts/',
});
app.engine('html', handlebars.engine);
app.set('view engine', 'html');

app.use((req, res, next) => {
	res.set('Cache-Control', 'no-store');
	next();
});

app.locals.site = {
	base: '45.66.137.243:33030'
};

core.initialize().then((core) => {
	const server = http.createServer(app);
	const { Server } = require('socket.io');
	global.io = new Server(server);
	
	app.get('/', async (req, res) => {
		var images = await core.getImages();
		var files = [];
		for(var img of images){
			var name = img.name.replace('.png', '').replace('.jpg', '');
			var path = img.path.replace('/var/www/ass-races/dist/assets', '');
			var data = {
				name: name,
				path: path
			};
			files.push(data);
		}
		res.render('game', {
			pageTitle: 'Game',
			images: files
		});
	});
	
	var controller = require('./lib/controller');
	io.on('connection', (socket) => {
		controller.init(core, socket);
	});
	
	server.listen(33030, () => {
		console.log('App running on localhost:'+33030);
	});
});
