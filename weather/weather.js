

const request = require('request');

var getWeather = (lat, lng, callback) => {



    request({
        url: `https://api.darksky.net/forecast/77a22dc2b852b5654322dc56bb546ed9/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to forecast server')
        } else if (response.statusCode === 404) {
            callback('Unable to fetch weather.');

        } else if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: (body.currently.temperature - 32) / 1.8,
                apparentTemperature: (body.currently.apparentTemperature - 32) / 1.8,
                windSpeed: (body.currently.windSpeed * 0.5144)
            });
        }

    });
};

module.exports.getWeather = getWeather;