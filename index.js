var express = require('express');
var app = express();
var path = require('path');
var settingsA = [];
var auth = require('./scripts/auth');
var settings = require('./scripts/settings');
var QRCode = require('qrcode');

const si = require('systeminformation');

settings.load;
settingsA = settings.getSettings;

//reading settings.json, make a new one if one isn't detected.


  
app.set('port', 8080);
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res){
  
  res.sendFile(path.join(__dirname + '/public/login.html'));
})
app.get('/dashboard', function(req, res){
  
  res.sendFile(path.join(__dirname + '/public/dashboard.html'));
})

app.get('/newQRcode', function(req,res){
    console.info("INFO:");
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
  console.info("INFO: recived call to verify token");
  
  var b = req.query.token;
  var c = req.query.usrid
  var d = auth.verifyT(req.query.usrid,req.query.token);
  console.log(d);
  if(d == false){
    res.send(403);
    console.log("token is wrong");
    
  }else {
    console.log("token is correct");
    res.send(200);
  }
});

app.get('/getsysinfo', function(req,res){
  let sysinfo = {
    info:[]
  };
  si.currentLoad(function(data){
    sysinfo.info.push({"cpuUse": data.currentload});
  })
  si.mem(function(data){
    sysinfo.info.push({"memUse": data.used,"memMax": data.total});  
  })
    setTimeout(function(){res.send(sysinfo)}, 200)
  });


app.listen(app.get('port'), function(){
    console.log('Osolo starting on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
  });

  