const request = require("request");

const DARK_SKY_SECRET_KEY = process.env['DARK_SKY_SECRET_KEY']

var getWeather = (latitude, longitude, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${DARK_SKY_SECRET_KEY}/${latitude},${longitude}`,
    json: true
  }, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to fetch weather darksky.net. Bad request.');
    }
  })
}

module.exports.getWeather = getWeather;