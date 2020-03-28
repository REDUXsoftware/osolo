
var twoF = require('node-2fa');
var QRCode = require('qrcode');

var gS;
var uri = "";
var QR = "";
var a = "";


function tf_genS(){
    gS = "";
    var newSecret = twoF.generateSecret({name: 'Osolo'});
    gS = newSecret.secret;
    uri = newSecret.uri;
    QR = newSecret.qr;
    
};
function tf_setS(a){
    gS = a;
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
    console.log(newToken);
}


module.exports = {
    /**
    * Set's 2FA Varibles
    * @param {string} a Secret Key 
    */
    setKeys: function(a){
        gS = a;
    },
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
    verifyToken: function(a){
        if(gS = null){
            var tokBuf = twoF.verifyToken(gS, a);
            console.log(tokBuf);
        }
        else {
            var tokBuf = twoF.verifyToken(gS, a);
            console.log(tokBuf);
        };
    
        if (!tokBuf.delta){
            console.log(tokBuf.delta);
            return false;
        }
        else {
            if(tokBuf.delta == 0){
                console.log(tokBuf.delta);
                return true;
            }
            else{
                console.log(tokBuf.delta);
                return false;
            };
        };
    },
    /**
     * Generate Token
     */
    genToken: tf_generateToken(),
};