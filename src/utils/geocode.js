const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2VuYW5jb2xsYWNvIiwiYSI6ImNrODNpZDEzZjBndnozb3F0am44OXZvbTQifQ.nqKG-M8NxC-FQ0cdw1hJJQ'
    request({url, json:true },(error, {body})=>
    {
    if(error)
    {
    callback('Unable to connect to location services.', undefined)
    }
    else if(body.features.length === 0)
    {
        callback('Unable to find Loaction Cordinates. Try another search.',undefined)
    }
    else{
        const data = {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        }
        callback(undefined,data)
        }
    })
    
    }
    
    
    module.exports = geocode