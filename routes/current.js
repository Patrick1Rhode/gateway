var express = require("express");
var router = express.Router();
var r = require("rethinkdbdash")();
var Infobip = require('infobip-sms');


router.get("/",function(req,res){
    var logged = false;
    var useremail = req.param("email");
    var usernamer = req.param("username");
    var senderName = req.param("sender");
    var messager = req.param("message");
    var userpass = req.param("password");
    var userphone = req.param("mobiles");
    var type = req.param("type");
    //dabase connection made
    var databaseName = "probase";
    var tableNameLogs = "logs";
    var tableNameUsers = "users";
    //

    //
        r.db(databaseName).table(tableNameUsers).filter({username : usernamer, password : userpass}).run().then(function(succ){
            console.log(succ.id);
            console.log(succ);
           if(succ.length!=0){
              
              // req.session.patrick = succ[0].email;
               r.db(databaseName).table(tableNameLogs).insert({userId : succ[0].id, number : req.param("phonenumber")}).run().then(function(s){
                 
                   
                   
                   //end
                   var messageID = Math.floor((Math.random() * 10000) + 1);
                   var sent = {responseId : "Sent", messageSentId : messageID};
                   //JSON.stringify(sent);
                 //sending text api
            var sms = new Infobip("PatrickSikalinda", "udVpVmYa");
            var sender = senderName;
            var recipients = [{ gsm: userphone, messageId : "testp" }];
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