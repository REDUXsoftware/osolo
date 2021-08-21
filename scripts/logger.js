module.exports = {
    note: function(a){
        console.log("[Note] " + a);
    },
    error: function(b){
        console.log('[','\x1b[31m','Error','\x1b[0m','] ' + b);
    },

}