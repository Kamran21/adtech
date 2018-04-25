var express = require('express');
var app = express();
var server = require('http').Server(app);

var port=5000;

app.use(express.static('client'));

server.listen(port, () => console.log(`listening on port ${port}!`));
