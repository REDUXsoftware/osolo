var express = require('express');
var app = express();
var path = require('path');
var settingsA = [];
var twoFA = require('./2fa');
var settings = require('./settings');

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
  res.sendFile(path.join(__dirname + '/login.html'));
})

app.get('/newQRcode', function(req,res){
    console.info("RECEIVED GET REQUEST");
    var b = req.query.otp;
    if (b = settingsA[0]){
      var buffer = settingsA[2];
      res.send(buffer);
    }
    else{
      console.log("wrong");
      res.send(403);
    };
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

  