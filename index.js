var express = require('express');
var app = express();
var path = require('path');

var settings = require('./settings');

settings.load;

//reading settings.json, make a new one if one isn't detected.


  
app.set('port', 8080);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/login.html'));
})

app.get('/newQRcode', function(req,res){
    console.info("RECEIVED GET REQUEST");
    var qParams = [];
    for (var p in req.query){
        qParams.push({'name':p, 'value':req.query[p]})
    }
    if (qParams[1].value == settings.getOTP){
      res.send(settings.getQR);
      console.log(settings.getQR);
    }
    else{
      console.log("wrong");
      res.send(403);
    };
   
   
});

app.listen(app.get('port'), function(){
    console.log('Osolo starting on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
  });

  