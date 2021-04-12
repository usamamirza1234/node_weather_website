const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forcast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// For path for load html
const publicDirectoryPath = path.join(__dirname, '../public')
// Setup handlebar location if we can change name
const viewsPath = path.join(__dirname, '../templetes/Views')
const partials = path.join(__dirname, '../templetes/partials')


const app = express()

// Setup handlebar
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partials);


// Setup directory
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "USAMA"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: 'Usama'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'MYSELF'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        console.log(req.query.search)
        return res.send({
            error: 'You must Search some thing'
        })
    }
    
    res.send({
        products: []
    })

})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

// app.get('/weather', (req, res) =>  
// {
//     if (!req.query.address) 
//     {
//         return res.send({
//             error: 'You must find some address'
//         })
        
//     }

//     geocode(req.query.address, (error, { latitude, longitude, location }) => {
//         if (error) {
//             return res.send({ error })
//         }


//         res.send({
//             forecast: latitude,
//             location:longitude,
//             address: location
//         })

    
  
//     })
  

// })
    



   

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMessage: 'Help Artical is not Found',
        name: "Help Artical is not Found"
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMessage: 'Page doesnt exsst',
        name: "No Page Found"
    })

})

app.listen(3000, () => {

    console.log('Server is up on port 3000.')
})