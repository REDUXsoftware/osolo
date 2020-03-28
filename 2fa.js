var settings = require('./settings');
var twoF = require('node-2fa');
var QRCode = require('qrcode');

var gS;
var uri = "";
var QR = "";


function tf_genS(){
    gS = "";
    var newSecret = twoF.generateSecret({name: 'Osolo'});
    gS = newSecret.secret;
    uri = newSecret.uri;
    QR = newSecret.qr;
    
};
function tf_setS(a,b){
    gS = a;
    QR = b;
}

function tf_getS(){
    return gS;
};

//return 
function tf_uri(){
    return uri;
};
function tf_QR(){
    return QR;
};
function tf_generateToken(){
    var newToken = twoF.generateToken(gS);
}

function tf_verifyToken(a){
    if(gS = null){
        var tokBuf = twoF.verifyToken(gSettings, a);
    }
    else {
        var tokBuf = twoF.verifyToken(gS, a);
    };

    if (tokBuf == null){
        return false;
    }
    else {
        if(tokBuf.delta == 0){
            return true;
        }
        else{
            return false;
        };
    };
};

module.exports = {
    /**
    * Set's 2FA Varibles
    * @param {string} a Secret Key 
    * @param {string} b QR Link
    */
    setKeys: tf_setS(),
    /**
     * Generates Token Secret
     */
    generateSecKey: tf_genS(),
    /**
     * Retrive's secret.
     */
    getSK: tf_getS(),
    geturi: tf_uri(),
    getQR: tf_QR(),
    /**
     * Verify the token
     */
    verifyToken: tf_verifyToken(),
    /**
     * Generate Token
     */
    genToken: tf_generateToken()
};