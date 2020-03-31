const fs = require('fs');
const sPath = 'users.json';
var speakeasy = require('speakeasy');
var QRCode = require('qrcode');

//varible def.
var secret;
var obj;

function readFile(){
    fs.readFile(sPath,(err, data) => {
        if (err){
            console.log("INFO: users.json was not found, generating a new one.");
            return 0;
        } else {
        obj = JSON.parse(data); 
        console.log("INFO: users.json loaded.")
        };
    });
}

/**
 * Find's the location of a key for a requested user ID
 * @param {string} a User ID
 */
function findSecret(a) {
    readFile;
    for(var i = 0; i < obj.users.length; i++) {
        if (obj.users[i]['id']== a){
            return i;
        }
    }
    return -1; //This means no match found
  }

  async function loadQRCode(a){
      let b = settings.users[a].qr
        QRCode.toDataURL(b, function(err, image_data) {
        console.log(image_data); // A data URI for the QR code image
        return new Promise(resolve => {
            setTimeout(() => {
              resolve(image_data);
            }, 2000);
          });
  })
};

module.exports = {
    /**
     * Generates a secret for a user.
     * On first time boot, generates users.json with default account.
     * @param {string} a User ID to generate key
     */
    genSecret: function(a){
        secret = speakeasy.generateSecret({length: 20});
        console.log("INFO: Generated secret for user id " + a +": " + secret.base32);
        fs.access(sPath, fs.F_OK, (err) => {
            //if user.json is not found, generate a new one and load it into array
            if (err) {
                let objA = {
                    users: [
                        {id: a, secret: secret.base32, qr: secret.otpauth_url}
                    ]
                };
                console.log("INFO: users.json was not found, generating a new one.");
                let data = JSON.stringify(objA, null, 2);
                fs.writeFileSync(sPath, data);
                console.info("INFO: users.json has been generated.");
            }
            else{
            //if file is found, read it and load it into array
            fs.readFileSync(sPath, (err, data) => {
                if (err) throw err;
                obj = JSON.parse(data); //now it an object
                obj.users.push({id: a, secret:secret.base32, qr: secret.otpauth_url}); //add some data
                json = JSON.stringify(obj, null, 2); //convert it back to json
                fs.writeFile(sPath, json,); // write it back 
            });
        };
        });
},
    /**
     * Retrieves QR url for ID requested.
     * @param {*} a User ID
     */
    getQR: async function(a){
        readFile;
        var location = findSecret(a);
        let b = await loadQRCode(location);
        return b;
        
          
    },
    /**
     * Initilizes users.json
     */
    loadUsers: readFile(),
    /**
     * Verifies the token from the user to log in.
     * @param {string} a Token inputted by user
     * @param {string} b User ID to verify secret 
     */
    verifyToken: function(a,b){
        var uSecret = findSecret(b);
        var tBuffer = speakeasy.totp.verify({
            secret: secret,
            encoding: 'base32',
            token: a
          });
        return tBuffer;
    },
}