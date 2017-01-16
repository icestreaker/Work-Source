var http = require('http');
var server = http.createServer();
var io = require('./index')(server, process.env.API_KEY);

server.listen(3000,function(){
    console.log("listening.....");
})