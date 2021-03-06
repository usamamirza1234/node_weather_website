const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=33282a92983c1e023487f94b9f567672&query=' + latitude + ',' + longitude


    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,  ' It is currently ' + body.current.temperature + ' degress out. There is a '
             + body.current.precip + '% chance of rain , International Time is ' +  body.current.observation_time +
             ' and Local time is ' +  body.location.localtime)
        }
    })
}

module.exports = forecast