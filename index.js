// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
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

app.get("/api/:date?", function(req, res) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun, ", "Mon, ", "Tue, ", "Wed, ", "Thu, ", "Fri, ", "Sat, "];
  const input = req.params.date;
  console.log(input);
  console.log(new Date(input));
  if (new Date(input) != "Invalid Date") {
    console.log("ddisp");
    ddisp(input, months, days, req, res);
  } else if (new Date(input * 1000) != "Invalid Date") {
    console.log("udisp");
    udisp(input, months, days, req, res);
  } else {
    console.log("error");
    res.json({error: `Invalid Date`});
  }
});
function ddisp(input, months, days, req, res) {
  const d = new Date(input);
  const unix = d.getTime();
  var day = days[d.getDay()];
  var date = d.getDate();
  var month = months[d.getMonth()];
  var year = d.getFullYear();
  var hours = d.getUTCHours();
  var minutes = d.getUTCMinutes();
  var seconds = d.getUTCSeconds();
  res.json({unix: `${unix}`, utc: `${day}${date} ${month} ${year} 00:00:00 GMT`});
}

function udisp(input, months, days, req, res) {
  const unix = input;
  console.log(unix);
  let ud = new Date(unix * 1);
  console.log(ud.toISOString());
  let utcString = ud.toUTCString();
  console.log(utcString);
  res.json({unix: `${unix}`, utc: `${utcString}`});
}

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
