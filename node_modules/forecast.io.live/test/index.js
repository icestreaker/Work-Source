var io = require('socket.io-client');
var app = require('../app'); 
var chai = require("chai");
var expect = chai.expect;  

     
describe("Forecast.io.live", function() {
     var url = 'http://localhost:3000';
     var options = {transports:['websocket'],'force new connection': true };
     this.timeout(20000);

  it("should send data", function(done) {

     var socket = io.connect(url,options);

    socket.emit('subscribe',{
             'lat':  37.8267,
             'long':-122.423,
             'lang': 'en'
     });
     
     socket.on('forecast',function(data,id){
         console.log(data);
         expect(data,id).to.include.keys('time');
        });

        setTimeout(done,15000);
  });

    it("should serve more than one client", function(done) {

    var socket1 = io.connect(url,options);
    var socket2 = io.connect(url,options);


    socket2.emit('subscribe',{
             'lat':  37.8267,
             'long':-122.423,
             'lang': 'en'
     });

     socket1.emit('subscribe',{
             'lat': 35.652832,
             'long': 139.839478,
             'lang': 'en'
     });

     socket1.on('forecast',function(data,id){
         console.log(data);
         expect(data,id).to.include.keys('time');
        });


     socket2.on('forecast',function(data,id){
        console.log(data);
        expect(data,id).to.include.keys('time');
        });
     setTimeout(done,15000);
  });

});