var Joi = require('joi');
var coordinates = require('./models/coordinates');
var options = require('./models/options');
var http = require('http');
var ForecastliveError = require('./error.js');
var cache = require('memory-cache');
var url = require('./urlBuilder.js');
var request = require('request').defaults({
    json: true
});

module.exports = function(server,apiKey,opts) {

    var args = Array.prototype.slice.call(arguments);
    if(!(args[0] instanceof http.Server)){
        throw new ForecastliveError('Argument "Server" is not an http.Server instance');
    }else if(!args[1] || typeof args[1] !== 'string'){
        throw new ForecastliveError("A string Argument 'apiKey' must be passed");
    }else if(args[2]){
        Joi.validate(args[2], options, function (err, value) {
             if(err !== null){
                throw new ForecastliveError(err.details[0].message); 
             }   
        });

    }

    var io = require('socket.io')(server);
    io.on('connection',function (socket) {
        var interval;
        socket.on('subscribe',function(params){
            Joi.validate(params, coordinates, function (err, value) {

                if(err === null){

                    params.id = socket.id;
                    if(!cache.get(JSON.stringify(params))){

                       interval = setInterval(function(){

                        request.get({
                            url: url(params,apiKey),
                            timeout: opts ? opts.timeout : 3000
                        }, function (error, response, body) {

                                if (!error && response.statusCode == 200) {
                                    socket.emit('forecast',body);
                                    return;
                                }
                                else if (!error && response.statusCode == 400) {
                                    socket.emit('forecast',"Bad request");
                                    return;
                                }

                            socket.emit('forecast','pending...');
                    });
                        }, opts ? opts.timeout : 5000);

                    cache.put(JSON.stringify(params), interval);

                    }
                  
                }else{
                    
                   socket.emit('err',err.details[0].message);
                }
             });
            
        });

        socket.on('disconnect',function(){
                var values =  cache.keys().filter(function(val){
                    return JSON.parse(val).id === socket.id;
                });
                values.forEach(function(el) {
                    clearInterval(cache.get(el));
                    cache.del(el);
                });
            });

        socket.on('stop',function(params){
          params.id = socket.id;
          var key = JSON.stringify(params);
          var value = cache.get(key);
          clearInterval(value);
          cache.del(key);
       });
    });

    }