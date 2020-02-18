const path = require('path');
const express = require('express')
const hbs = require('hbs')

const GeoCode = require('./utils/GeoCode');
const forecast = require('./utils/forecast');

const app = express();
// Define paths for express to configure
const PublicDir   = path.join(__dirname, '../public');
const ViewsDir    = path.join(__dirname, '../templates/views');  /// side not.. this can be undone and set views folder in place of run the program!
const PartialsDir = path.join(__dirname, '../templates/partials');
// setup handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', ViewsDir)
hbs.registerPartials(PartialsDir)
// setup static directory to serve
app.use(express.static(PublicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Wagdy Samih"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Wagdy Samih"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Wagdy Samih"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        return res.send({
            error: "You Must Provide An Adress!"
        })
    }
    const adress=req.query.adress;
    GeoCode(adress, (error, { latitude, longitude, location } ={}) => {
        if (error) {
            return res.send({   error  })
        }
        forecast(longitude, latitude, (error, { temperature, 'chance of rain': Rain,summary } = {}) => {
            if (error) {
                return res.send({   error   })
            }
            res.send({
                location,
                temperature,
                "chance of rain":Rain,
                summary
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404 Page",
        ErrorMsg: "Help Article Not Found",
        name: "Wagdy Samih"

    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404 Page",
        ErrorMsg: "Page Not Found",
        name: "Wagdy Samih"
    })
})
app.listen('3000', () => console.log('Starting server'))