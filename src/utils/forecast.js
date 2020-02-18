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
               "summary":body.daily.data[0].summary,
               "temperature": body.currently.temperature,
               "chance of rain": body.currently.precipProbability,
            })
        }
    })}
module.exports=forecast