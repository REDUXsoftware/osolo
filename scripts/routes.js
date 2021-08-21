module.exports = function(bend){
    bend.get('/', function(req, res){
  
        res.sendFile(path.join(__dirname + '/public/login.html'));
      })
      bend.get('/dashboard', function(req, res){
        
        res.sendFile(path.join(__dirname + '/public/dashboard.html'));
      })
      
      //move this to another file, prob auth.js
      bend.get('/newQRcode', function(req,res){
          console.info("INFO:");
          var b = req.query.otp;
          var c = req.query.usrid;
          var d = auth.getQR(c);
          console.log("index.js: " + d);
          QRCode.toDataURL(d, function(err, image_data) {
            console.log("index.js: " + image_data); // A data URI for the QR code image
            res.send(image_data);
          });
      });
      
      //move this to another file, prob auth.js
      bend.get('/verifyT', function(req,res){
        console.info("INFO: recived call to verify token");
        
        var b = req.query.token;
        var c = req.query.usrid
        var d = auth.verifyT(req.query.usrid,req.query.token);
        console.log(d);
        if(d == false){
          res.send(403);
          console.log("token is wrong");
          
        }else {
          console.log("token is correct");
          res.send(200);
        }
      });



      
      /* 
      //gotta move this to a nicer place and prob optimize the func using callbacks or something like that
      bend.get('/getsysinfo', function(req,res){
        let sysinfo = {
          info:[]
        };
        si.currentLoad(function(data){
          sysinfo.info.push({"cpuUse": data.currentload});
        })
        si.mem(function(data){
          sysinfo.info.push({"memUse": data.used,"memMax": data.total});  
        })
        //a hack so the program stops just enough time so the info can be added to the arr. gotta change the whole func to promises or callbacks.
          setTimeout(function(){res.send(sysinfo)}, 200)
        });
        */
};