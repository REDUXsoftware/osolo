/**
 * Osolo's Settings Manager
 */
const fs = require('fs');
const sPath = 'settings.json';
var auth = require('./auth');
const cryptoRandomString = require('crypto-random-string');

var userIDs = [];

var otbuffer = cryptoRandomString({length: 6, type: 'base64'});

fs.readFile(sPath,(err, data) => {
        if (err) {
            console.log(err);
            var bufID = cryptoRandomString({length: 6, type: 'base64'});
            console.info("INFO: settings.json not found, generating a new one.")
            settings = { 
                otpin: otbuffer, 
                users: [
                    {"name":"admin","id": bufID}
                ]  
            };
            let data = JSON.stringify(settings, null, 2);
            auth.genSecret(bufID);
            fs.writeFile(sPath, data);
            
            console.info("INFO: settings.json has been generated.");
            console.info("OTP for 2FA can be found in settings.json");
        }
                settings = JSON.parse(data);
                console.info("INFO: settings.json loaded.");
                console.log("OTPIN:" + settings.otpin);
                console.log(settings);
    });

/**
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
            auth.genSecret(bufID);
            fs.writeFileSync(sPath, data);
            
            console.info("INFO: settings.json has been generated.");
            console.info("OTP for 2FA can be found in settings.json");
        }
        //if file is found, read it and load it into array
        auth.loadUsers;
        fs.readFile(sPath, (err, data) => {
            if (err) throw err;
            global.settings = JSON.parse(data);
            console.info("INFO: settings.json loaded.");
            console.log("OTPIN:" + settings.otpin);
            
        });
        return true;
    });
};
*/

function getOTP(){
    try {
        fs.readFile(sPath, (err, data) => {
            if (err) throw err;
            settings = JSON.parse(data);
            console.info("INFO: getting OTP.");
            return settings.otpin;
        });
    } catch(error) {
        console.error(error);
        return 0;
      }
   
}


auth.loadUsers;

module.exports = {
    /**
    * Initializes settings.json
    */
 //  load: load(),
    /**
     * Retrieves settings into a obj array
     */
    getUsers: function(){
        return settings.users;
    },

    getOTP: () => {
        return settings.otpin;
    },

    isUsrValid: function(a){
        for(var i = 0; i < settings.users.length; i++) {
            if (settings.users[i]['id']== a){
                return true;
            }
            else{
                return false;
            };
        }; 
    },
    /**
     * Add's a new user to settings.json and users.json
     * @param {string} a Username of new user
     */
    addUser: function(a){
        let bufID = cryptoRandomString({length: 6, type: 'base64'});
        for(var i = 0; i < settings.users.length; i++) {
            if (x[i]['id']== bufID){
                bufID = cryptoRandomString({length: 6, type: 'base64'});
                return;
            };
        }; 
        fs.readFileSync(sPath, (err, data) => {
            if (err) throw err;
            obj = JSON.parse(data); //now it an object
            obj.users.push({name: a, id: bufID}); //add some data
            json = JSON.stringify(obj, null, 2); //convert it back to json
            fs.writeFile(sPath, json,); // write it back 
            auth.genSecret(bufID);
        });
    },
};

