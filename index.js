var express = require('express');
var app = express();
var path = require('path');
var settingsA = [];
var auth = require('./scripts/auth');
var settings = require('./scripts/settings');
var sArr;





  
app.set('port', 8080);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.get('/', function(req, res){
  auth.genToken;
  res.sendFile(path.join(__dirname + '/html/login.html'));
})

app.get('/newQRcode', function(req,res){
    console.info("RECEIVED GET REQUEST for QR Code");
    var b = req.query.otp;
    var c = req.query.usrid;
    var d = settings.getOTP;
    console.log(settings.getOTP);
      var buffer = auth.getQR(c);
      console.log(buffer);
      res.send(auth.getQR(c));
  
    
});

app.get('/getUsers', function(req,res){
  console.info("RECEIVED USERS GET REQUEST");
    res.send(settingsA.users);
});

app.get('/verifyT', function(req,res){
  console.info("RECEIVED GET REQUEST");
  var b = req.query.tfa;
  var d = req.query.usrid;
  var c = auth.verifyToken(b,d);
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

  