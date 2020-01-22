const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/aaec9ac0c331e3f383ebbaa02d4d87a1/${latitude},${longitude}?units=si&lang=en`
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
           callback('Unable to connect to the forecast service', undefined)
        } else if (body.error) {
            callback('Unable to find weather of the location', undefined)
        } else {
            const precipProb = body.currently.precipProbability
            const todaySummary = body.daily.data[0].summary
            const temperatureHigh = body.daily.data[0].temperatureHigh
            const temperatureLow = body.daily.data[0].temperatureLow
            const result = `${todaySummary} Temperature is about ${temperatureHigh} - ${temperatureLow} degrees Celcius. There is a ${precipProb}% chance of rain.`
            callback(undefined, result)
        }
    })
}

module.exports = {
    forecast
}