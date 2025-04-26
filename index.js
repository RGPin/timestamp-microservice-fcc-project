// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { isNull } = require('mathjs');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
// sample requests: /api/2015-12-25, /api/1451001600000
app.get("/api/:date", (req, res) => {
  let dateObject;
  const digitsOnlyCheck = /^\d+$/;
  if(digitsOnlyCheck.test(req.params.date)) {
    const timeStampUnix = Number(req.params.date);
    dateObject = new Date(timeStampUnix);
  } else {
    dateObject = new Date(req.params.date);
  }
  if(isNaN(dateObject.getTime())) {
    res.json({"error": "Invalid Date"});
  } else {
    res.json({"unix": dateObject.getTime(), "utc": dateObject.toUTCString()});
  }
    
});

app.get("/api/", (req, res) => {
  const dateObject = new Date();
  res.json({"unix": dateObject.getTime(), "utc": dateObject.toUTCString()});
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
