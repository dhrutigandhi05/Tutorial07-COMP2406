/*
(c) 2025 Louis. D. Nel

WARNING:
NOTE: THIS CODE WILL NOT RUN UNTIL YOU
SUBSTITUTE YOUR OWN openweathermap.org APP_ID KEY in the code

INSTALL INSTRUCTIONS:
npm install

LAUNCH INSTRUCTIONS:
node server.js

TEST INSTUCTIONS:
Simple express server re-serving data from openweathermap.org
To test:
http://localhost:3000
or
http://localhost:3000/weather?city=Ottawa
to just set JSON response. (Note it is helpful to add a JSON formatter extension, like JSON Formatter, to your Chrome browser for viewing just JSON data.)
*/

const express = require('express') //express framework
const http = require('http')
const PORT = process.env.PORT || 3000 //allow environment variable to possible set PORT

/*YOU NEED AN APP ID KEY TO RUN THIS CODE
  GET ONE BY SIGNING UP AT openweathermap.org
*/
const API_KEY = 'c8ad2a0a666296c88480cc8bcc50ad03' //<== YOUR API KEY HERE

const app = express()

//Middleware
app.use(express.static(__dirname + '/public')) //static server

//Routes
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.get('/weather', (request, response) => {
  let city = request.query.city
  if(!city) {
    //send json response to client using response.json() feature
    //of express
    response.json({message: 'Please enter a city name'})
    return
  }

  let options = {
    host: 'api.openweathermap.org',
    path: '/data/2.5/weather?q=' + city +
      '&appid=' + API_KEY
  }
  //create the actual http request and set up
  //its handlers
  http.request(options, function(apiResponse) {
    let weatherData = ''
    apiResponse.on('data', function(chunk) {
      weatherData += chunk
    })
    apiResponse.on('end', function() {
      response.contentType('application/json').json(JSON.parse(weatherData))
    })
  }).end() //important to end the request
           //to actually send the message
})

//start server
app.listen(PORT, err => {
  if(err) console.log(err)
  else {
    console.log(`Server listening on port: ${PORT}`)
    console.log(`To Test:`)
    console.log(`http://localhost:3000/weather?city=Ottawa`)
    console.log(`http://localhost:3000`)
  }
})
