/**
 * Osolo's Settings Manager
 */
const fs = require('fs');
const sPath = 'settings.json';
var auth = require('./auth');
const cryptoRandomString = require('crypto-random-string');

var userIDs = [];
var settings = [];
var otbuffer = cryptoRandomString({length: 6, type: 'base64'});


//to-do: add encrpytion to this with a user's own pin or something among those lines.
function loadSettings(){
    fs.access(sPath, fs.F_OK, (err) => {
        //if settings.json is not found, generate a new one and load it into array
        if (err) {
            //should move this to it's own function, clean it up a bit
            var bufID = cryptoRandomString({length: 6, type: 'base64'});
            console.info("INFO: settings.json not found, generating a new one.")
            let settings = { 
                otpin: otbuffer, 
                users: [
                    {"name":"admin","id": bufID}
                ]  
            };
            let data = JSON.stringify(settings, null, 2);
            auth.genSecret(bufID);
            fs.writeFileSync(sPath, data);
            
            console.info("settings.json has been generated.");
            console.info("OTP for 2FA can be found in settings.json");
        }
      
        //if file is found, read it and load it into array
        fs.readFile(sPath, (err, data) => {
            if (err) throw err;
            settings = JSON.parse(data);
            console.info("settings.json loaded.");
            console.log("OTPIN:" + settings.otpin);
          //  auth.int();
        });
   
    });
};

function getSettings(){
  return settings;
};
module.exports = {
    /**
    * load's settings.json and user.json into prog. memory
    */
    load: loadSettings(),
    /**
     * Retrieves settings into a obj array
     */
    getSettings: getSettings()
};

