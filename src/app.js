const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express  cpnfig
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views loacation
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name:'Kenan Collaco'
    })
}) 

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About me',
        name:'Kenan Collaco'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message: 'Hi, how can i help you',
        title:'Help',
        name:'Kenan Collaco'
    })
})

app.get('/weather',(req,res)=>{
if(!req.query.address){
    return res.send({
        error:'You must provide an address!'
    })

}
console.log(req.query.address)
geocode(req.query.address,(error, {latitude, longitude, location}={})=>{
    if(error){
        return res.send({error})
    }
   
    forecast(latitude, longitude, (error, forecastdata) => {
        if(error){
            return res.send(error)
        }
        res.send({
            forecast:forecastdata,
            loaction:location,
            address: req.query.address
        })
      })
   })
    
})




app.get('/products',(req,res)=>{
    if(!req.query.search){
     return res.send({
          error:'You must provide a search term'
      })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        errorMessage:'Help article not found.',
        title:'404',
        name:'Kenan Collaco'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        errorMessage:'Page not found ',
        title:'404',
        name:'Kenan Collaco'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
