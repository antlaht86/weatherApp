const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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



geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    }

    else {
        console.log(results.address);

        weather.getWeather(results.latitude, results.longitude, (errorMessage2, results2) => {
            if (errorMessage2) {
                console.log(errorMessage2);
            }
            else {
                console.log(`It's currently ${results2.temperature} °C. It feel like ${results2.apparentTemperature} °C. Wind speed is ${results2.windSpeed} m/s.`);
            }
        });
    }
});






