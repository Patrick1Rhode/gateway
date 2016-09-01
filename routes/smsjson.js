var express = require("express");
var router = express.Router();
var r = require("rethinkdbdash")();
var Infobip = require('infobip-sms');


router.get("/",function(req,res){
    
    var useremail = req.param("email");
    var usernamer = req.param("username");
    var messager = req.param("message");
    var userpass = req.param("password");
    var userphone = req.param("phonenumber");
    //dabase connection made
        r.db("test").table("users").filter({email : useremail, password : userpass}).run().then(function(succ){
            console.log(succ.id);
            console.log(succ);
           if(succ.length!=0){
              
               r.db("test").table("logs").insert({userId : succ[0].id, number : req.param("phonenumber")}).run().then(function(s){
                 
                   
                   
                   //end
                   var sent = {responseId : "Sent", messageSentId : "223555jjkj"};
                   //JSON.stringify(sent);
                 //sending text api
            var sms = new Infobip("PatrickSikalinda", "udVpVmYa");
            var sender = usernamer;
            var recipients = [{ gsm: userphone, messageId : 'validity' }];
            var msg = messager.toString('utf8');
            var options = { text : true };

            sms.send(sender, msg, recipients, options, function(e, r){
                if (e) { return 'woopsie daisy'; }
                console.log(e, r);
});
//end of infobip api
                   
                   
                 res.jsonp(sent);
                                         
                                         });
           }
            else{
                  
                var sent = {responseId : "Authentication failed",message : "Wrong token key or username"};
                JSON.stringify(sent);
                res.jsonp(sent);
            }
            
            

        }).error(function(err){
            console.log("row not fetched");
        });
//
});
module.exports=router;