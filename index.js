var express = require('express');
//bend, short for backend. im lazy ok?
var bend = express();
var path = require('path');
var settingsA = [];
var auth = require('./scripts/auth');
var settings = require('./scripts/settings');
var QRCode = require('qrcode');

require('./scripts/routes')(bend);

const si = require('systeminformation');

//maybe make this look nicer.
settings.load;
settingsA = settings.getSettings;

//reading settings.json, make a new one if one isn't detected.


  
bend.set('port', 8080);
bend.use(express.static(path.join(__dirname, 'public')));




bend.listen(bend.get('port'), function(){
    console.log('Osolo starting on http://localhost:' + bend.get('port') + '; press Ctrl-C to terminate.');
  });

  