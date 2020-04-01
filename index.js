var express = require('express');
var app = express();
var path = require('path');
var settingsA = [];
var auth = require('./scripts/auth');
var settings = require('./scripts/settings');
var QRCode = require('qrcode');

settings.load;
settingsA = settings.getSettings;

//reading settings.json, make a new one if one isn't detected.


  
app.set('port', 8080);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.get('/', function(req, res){
  twoFA.genToken;
  res.sendFile(path.join(__dirname + '/html/login.html'));
})

app.get('/newQRcode', function(req,res){
    console.info("RECEIVED GET REQUEST");
    var b = req.query.otp;
    var c = req.query.usrid;
    var d = auth.getQR(c);
    console.log("index.js: " + d);
    QRCode.toDataURL(d, function(err, image_data) {
      console.log("index.js: " + image_data); // A data URI for the QR code image
      res.send(image_data);
    });
});

app.get('/verifyT', function(req,res){
  console.info("RECEIVED GET REQUEST");
  var b = req.query.tfa;
  var c = twoFA.verifyToken(b);
  if(c = true){
    console.log("token is correct");
    res.send(200);
  }
  else {
    res.send(403);
    console.log("token is wrong");
  }
});

app.listen(app.get('port'), function(){
    console.log('Osolo starting on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
  });

  