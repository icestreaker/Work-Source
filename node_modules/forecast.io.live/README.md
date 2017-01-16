[![Build Status](https://travis-ci.org/hamzaOp/forecast.io.live.svg?branch=master)](https://travis-ci.org/hamzaOp/forecast.io.live)
[![npm version](https://badge.fury.io/js/forecast.io.live.svg)](https://badge.fury.io/js/forecast.io.live)

# forecast.io.live
Wrapper for forecast.io API using Socket.IO

You can find [here](https://github.com/hamzaOp/Example-app) the repository for the example app using forecast.io.live

# How to use
    npm install forecast.io.live
    
### Server side

    var io = require('forecast.io.live')(Server, API_KEY[, Options]);

**Server** : http.Server instance. 

**API_KEY** : A valid api key. 

**Options** : An object, with the following properties :

    {
      timeInterval(ms),
      timeout(ms)
    }
    
<i>timeInterval</i> : The time between each API call.

<i>timeout</i> : timeout for each request.

###Client side

Make sure to include `socket.io` in your code :

    <script src="/socket.io.js"></script>
  
 then establish the connection with your websocket server :

    var socket = io.connect(url,
     { 
       transports:['websocket'],
       'force new connection': true
     }
     });

That's it ! , we can now **emit** a `subscribe`  event and **listen** for a `forecast` event.  
####socket.emit("subscribe", query)
Once we subscribe with a query object, we receive the real-time data pushed by the server, we will call it a **stream**, each stream is identified by its **query** object, the query object have the following properties : 

    {
       'lat': LATITUDE,
       'long': LONGTITUDE
    }

These two properties are required, but you can pass others as well such as 
`lang`, `units`. All the available options are explained in the [API docs](https://developer.forecast.io/docs/v2#options).

To receive the real-time data, we listen to the `forecast` event.
####socket.on("forecast", function(data) { ... })

The data argument contains the response from the server.

**Note :** if we emit multiple `subscribe` events, we should listen to a single `forecast` event, the *data* argument will contains the real-time data for all our subscribed locations.


  



  


