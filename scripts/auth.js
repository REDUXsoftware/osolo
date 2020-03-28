const fs = require('fs');
const sPath = './cfg/users.json';
var speakeasy = require('speakeasy');
var QRCode = require('qrcode');

//varible def.
var secret;

function filterItems(query) {
    var qrResult;
    fs.readFile(sPath, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log("INFO: users.json was not found, generating a new one.");
            return 0;
        } else {
        obj = JSON.parse(data); //now it an object
        qrResult = obj.filter(x => x.id === a)
    }});
    return arr.filter(function(el) {
        return el.toLowerCase().indexOf(query.toLowerCase()) !== -1
    })
  }

function genQRCode(){
    QRCode.toDataURL(secret.otpauth_url, function(err, image_data) {
        console.log(image_data); // A data URI for the QR code image
        return image_data;
      });
};

function getSecret(){
    return secret.base32;
};

module.exports = {
    setSecret: function(a){
        if(!a){
            return 0;
        }
        else{
            secret.base32 = a;
            return 1;
        }
    },
    /**
     * Generates a secret for a user.
     * On first time boot, generates users.json with default account.
     * @param {*} a User ID to generate key
     */
    genSecret: function(a){
        secret = speakeasy.generateSecret({length: 20});
        console.log("Generated secret for user id " + a +": " + secret.base32);
        fs.readFile(sPath, 'utf8', function readFileCallback(err, data){
            if (err){
                let objA = {
                    users: [
                        {id: a, secret: secret.base32, qr: secret.otpauth_url}
                    ]
                };
                console.log("INFO: users.json was not found, generating a new one.");
                var json = JSON.stringify(objA, null, 2);
                fs.writeFile(sPath, json, 'utf8', callback);
            } else {
            obj = JSON.parse(data); //now it an object
            obj.users.push({id: a, secret:secret.base32, qr: secret.otpauth_url}); //add some data
            json = JSON.stringify(obj, null, 2); //convert it back to json
            fs.writeFile(sPath, json, 'utf8', callback); // write it back 
        }});
    },
    /**
     * Retrieves QR url for
     * @param {*} a 
     */
    getQR: function(a){
        QRCode.toDataURL(a, function(err, image_data) {
            console.log(image_data); // A data URI for the QR code image

            
          });
    }

};