const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url:`https://api.forecast.io/forecast/518478e31f58ffdcfef37f1c12700881/${lat},${lng}`,
    json: true
  },  (error, response, body) => {
    if (error) {
      callback('Unable to connect to weather server.')
    } else if (response.statusCode !== 200) {
      callback('Unable to fetch weather.')
    } else if (response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
  });
};

module.exports.getWeather = getWeather;
