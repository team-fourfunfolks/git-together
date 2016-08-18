const express = require('express');
const app = express();
// may need to change config to config.prod later on
const config = require('../webpack.config');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

// hands this compiler off to the middleware for hot reloading
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
	noInfo: true,
	// public path simulates publicPath of config file
	publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

app.use(express.static('./dist'));

const server = app.listen(3000);
const io = require('socket.io').listen(server);


const connections = [];
const title = 'Untitled Presentation';
io.sockets.on('connection', function (socket) {

	socket.once('disconnect', function() {
		connections.splice(connections.indexOf(socket), 1);
		socket.disconnect();
		console.log("Disconnected: %s sockets remaining.", connections.length);
	});

	socket.emit('welcome', {
		title: title
	});

	connections.push(socket);
    console.log("Connected: %s sockets connected.", connections.length);
});

console.log("Polling server is running at 'http://localhost:3000'");



/*************
*** O Auth ***
**************/
const options = {
  client_id: 'c0c337734c01396eb065',
  client_secret: '78269c29c0295c9d2c9da5151ca361c7dc42f2d4'
}

var oauth = require("oauth").OAuth2;
var OAuth2 = new oauth(options.client_id, options.client_secret, "https://github.com/", "login/oauth/authorize", "login/oauth/access_token");

app.get('/auth/github',function(req,res){
   res.writeHead(303, {
     Location: OAuth2.getAuthorizeUrl({
       redirect_uri: 'http://localhost:3000/auth/github/callback',
       scope: "user,repo,gist"
     })
    });
    res.end();
});

app.get('/auth/github/callback',function (req, res) {
  var code = req.query.code;
  OAuth2.getOAuthAccessToken(code, {}, function (err, access_token, refresh_token) {
    if (err) {
      console.log(err);
    }
    accessToken = access_token;
    // authenticate github API
    console.log("AccessToken: "+accessToken+"\n");
    github.authenticate({
      type: "oauth",
      token: accessToken
    });
  });
  res.redirect('home');
});