var express = require("express");
var router = express.Router();
var r = require("rethinkdbdash")();
var Infobip = require('infobip-sms');


router.get("/",function(req,res){
    
    var useremail = req.param("email");
    var usernamer = req.param("username");
    var messager = req.param("message");
    var userpass = req.param("password");
    //dabase connection made
        r.db("test").table("users").run().then(function(succ){
            
           if(userpass==succ[0].password && useremail==succ[0].email){
              
               r.db("test").table("logs").insert({userId : succ[0].id, number : req.param("phonenumber")}).run().then(function(s){
                   //sending text api
                   var sms = new Infobip(usernamer, 'password');
            
            var recipients = [{ gsm: '260972148199', messageId : 'validity' }];
            var msg = 'standard message send'.toString('utf8');
            var options = { text : true };

            sms.send(sender, msg, recipients, options, function(e, r){
                if (err) { return 'woopsie daisy'; }
                console.log(e, r);
});
                   //end
                   var sent = {responseId : "Sent", messageSentId : "223555jjkj"};
                   //JSON.stringify(sent);
                   
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