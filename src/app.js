const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { geocode }= require('./utils/geocode')
const { forecast }= require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express configuration
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set static assets location
app.use(express.static(publicPath))

// Static weather data
const weather = {
    location: 'Universitas Budi Luhur, Jalan Ciledug Raya No. 99, Jakarta Selatan, Jakarta 12260, Indonesia',
    forecast: 'Rain starting in the afternoon. It is currently 31.72 degrees out. There is a 0.26% chance of rain.'
}

const name = 'zasdaym'

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name,
        help: 'https://www.google.com'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name,
        message: 'Help article not found'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, result) => {
            if (error) {
                return res.send({
                    error
                })
            }

            return res.send({
                forecast: result,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Search string must be provided'
        })
    }
    res.send({
        products: req.query.search
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Robot'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})