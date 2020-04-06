const request = require('request')

const forecast = (lat,lng,callback)=>{
const url ='https://api.darksky.net/forecast/391f49688a5cf49f79c70d7ae6acf022/'+ encodeURIComponent(lat) +','+ encodeURIComponent(lng) +'?units=si'

request({url, json:true},(error,{body})=>
{
    if(error){
        callback('Unable to connect to weather service',undefined)
    }
    else if(body.error){
    callback('Unable to find loacation', undefined)
    }   
   
    else{
    const data = body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out. There is a '+ body.currently.precipProbability + '% chance of rain.'
    callback(undefined, data)
    }

})

}

module.exports = forecast