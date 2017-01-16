var querystring = require('querystring');
var _ = require('lodash');


module.exports = function(params,apiKey){

var copy = Object.assign({}, params);
var baseUrl = 'https://api.forecast.io/forecast/' + apiKey + '/';
baseUrl = baseUrl + copy.lat + ',' + copy.long + '/?';

delete copy.lat;
delete copy.long;
delete copy.id;

if(!_.isEmpty(copy)){
            baseUrl+= querystring.stringify(copy);
}

return baseUrl;

}