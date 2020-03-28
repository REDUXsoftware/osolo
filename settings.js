/**
 * Osolo's Settings Manager
 */
const fs = require('fs');
const sPath = './settings.json';
var twofactor = require('./2fa');
const cryptoRandomString = require('crypto-random-string');

var otp = "";
var settings = [];
var otbuffer = cryptoRandomString({length: 6, type: 'base64'});


function loadSettings(){
    fs.access(sPath, fs.F_OK, (err) => {
        //if settings.json is not found, generate a new one and load it into array
        if (err) {
            twofactor.generateSecKey;
            console.info("INFO: settings.json not found, generating a new one.")
            let settings = { 
                otpin: otbuffer, //location 0
                gSec:  twofactor.getSK, //location 1
                tQR:   twofactor.getQR, //location 2  
            };
            let data = JSON.stringify(settings, null, 2);
            fs.writeFileSync('settings.json', data);
            console.info("settings.json has been generated.");
            console.info("OTP for 2FA can be found in settings.json");
        }
       
        //if file is found, read it and load it into array
        fs.readFile(sPath, (err, data) => {
            if (err) throw err;
            let setting5 = JSON.parse(data);
            settings[0] = setting5.otpin;
            settings[1] = setting5.gSec;
            settings[2] = setting5.tQR;
            var key = settings[1];
            twofactor.setKeys(key);
            console.info("settings.json loaded.");
            console.log("OTPIN:" + settings[0]);
        });
   
    });
};

function getSettings(){
  return settings;
};
module.exports = {
    /**
    * Initializes settings.json
    */
    load: loadSettings(),
    /**
     * Retrieves settings into a obj array
     */
    getSettings: getSettings()
};

