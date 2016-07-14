var express = require('express');
var mongoose = require('mongoose');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var messages = [{
        id: 1,
        text: "Hola soy mensaje",
        author: "Oscar Bolaños"
    }];

//app.configure(function () {
    //app.use(express.bodyParser());
    //app.use(express.methodOverride());
    //app.use(app.router);
//});

app.use(express.static('public'));

app.get('/hello', function (req, res) {
    res.status(200).send('dd Mundo!');
});

io.on('connection', function (socket) {
    console.log('Alguien se ha conectado con Sockets');
    socket.emit('messages', messages );
    socket.on('new-message', function (data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

server.listen(1337, function () {
    console.log('Corriendo');
});


var https = require('http');
var optionsget = {
    host : '190.121.144.12', // here only the domain name
    // (no http/https !)
    port : 9001,
    path : '/api/v_afiliados/byid/1', // the rest of the url with parameters if needed
    method : 'GET' // do GET
};

console.info('Options prepared:');
console.info(optionsget);
console.info('Do the GET call');

// do the GET request
var reqGet = https.request(optionsget, function (res) {
    console.log("statusCode: ", res.statusCode);
    // uncomment it for header details
    //  console.log("headers: ", res.headers);
    
    
    res.on('data', function (d) {
        console.info('GET result:\n');
        process.stdout.write(d);
        console.info('\n\nCall completed');
    });

});

reqGet.end();
reqGet.on('error', function (e) {
    console.error(e);
});