const yargs = require('yargs');
const axios = require('axios');


//77a22dc2b852b5654322dc56bb546ed9

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBXr5i-vA66XDPKEoUsDbe-qcJoBg4rxw4`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;

    var weatherUrl = `https://api.darksky.net/forecast/77a22dc2b852b5654322dc56bb546ed9/${lat},${lng}`;

    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = (response.data.currently.temperature - 32) / 1.8;
    var apparentTemperature = (response.data.currently.apparentTemperature - 32) / 1.8;
    console.log(`It's currently ${temperature} °C. It feel like ${apparentTemperature} °C. `);

}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(e.message);
    }

});

