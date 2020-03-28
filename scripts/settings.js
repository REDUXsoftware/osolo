/**
 * Osolo's Settings Manager
 */
const fs = require('fs');
const sPath = './cfg/settings.json';
var twofactor = require('./auth');
const cryptoRandomString = require('crypto-random-string');

var userIDs = [];
var settings = [];
var otbuffer = cryptoRandomString({length: 6, type: 'base64'});


function loadSettings(){
    fs.access(sPath, fs.F_OK, (err) => {
        //if settings.json is not found, generate a new one and load it into array
        if (err) {
            var bufID = cryptoRandomString({length: 6, type: 'base64'});
            console.info("INFO: settings.json not found, generating a new one.")
            let settings = { 
                otpin: otbuffer, 
                users: [
                    {"name":"admin","id": bufID}
                ]  
            };
            let data = JSON.stringify(settings, null, 2);
            fs.writeFile('settings.json', data);
            console.info("settings.json has been generated.");
            console.info("OTP for 2FA can be found in settings.json");
        }
       
        //if file is found, read it and load it into array
        fs.readFile(sPath, (err, data) => {
            if (err) throw err;
            
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

