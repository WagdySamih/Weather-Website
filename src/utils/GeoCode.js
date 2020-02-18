const request=require('request');
const GeoCode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1Ijoid2FnZHktc2FtaWgiLCJhIjoiY2s1bjUzZWxxMDNmaTNtbXBlMGc1ZnBrbSJ9.dY8SgSgnfXXk9FtAb9FQcg&limit=1'
    request({ url, json: true }, (error, { body }={}) => {
        if (error) {
            callback('Unable to connect to the Geocoding service!!', undefined);
        } else if (body.features.length === 0) {
            callback('Wrong Location!', undefined);
        } else {
            callback(undefined, {
                "longitude": body.features[0].center[0],
                "latitude": body.features[0].center[1],
                "location": body.features[0].place_name
            })
        }
    })
}
module.exports=GeoCode;