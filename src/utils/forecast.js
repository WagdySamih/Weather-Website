const request=require('request');
const forecast=(longitude,latitude,callback)=>{    
    const url = 'https://api.darksky.net/forecast/979d02b3667d482ee4d3b62845b2323e/'+latitude+','+longitude+'?units=si';
    request({ url, json: true }, (error, { body }={}) => {
        if (error)
            callback('Unable to connect to weather service!',undefined)
        else if (body.error)
            callback('Unable to find location!',undefined)
        else {
               callback(undefined,{
          line1: body.daily.summary,
          line2: body.daily.data[0].summary+" It's currently "+body.currently.temperature+" degrees out.there is "+ body.currently.precipProbability+'% chance of rain. The high today is '+body.daily.data[0].temperatureHigh+' degrees, with the a low of '+body.daily.data[0].temperatureLow+' degrees.'
      } )}
    })}
module.exports=forecast