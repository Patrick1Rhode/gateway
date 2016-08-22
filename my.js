var express = require("express");
var app = express();
var indexp = require(__dirname+"/routes/index.js")
var contactp = require(__dirname+"/routes/contact.js")
var r = require('rethinkdbdash')();
//app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use("/index",indexp);
app.use("/contact",contactp);
app.use("/v1/sms/json",function(req,res){
    var useremail = req.param("email");
    var userpass = req.param("password");
    console.log("/v1/sms/json visted by "+useremail);
    console.log("/v1/sms/json visted by "+userpass);
    //dabase connection made
        r.table("users").run().then(function(succ){
            
           if(userpass==succ[0].password && useremail==succ[0].email){
              
               r.table("logs").insert({userId : succ[0].id, number : req.param("phonenumber")}).run().then(function(s){
                   var sent = {responseId : "Sent", messageSentId : "223555jjkj"};
                   JSON.stringify(sent);
                   
                 res.send(sent);
                                         
                                         });
           }
            else{
                var sent = {responseId : "Authentication failed",message : "Wrong token key or username"};
                JSON.stringify(sent);
                res.send(sent);
            }
            
            

        }).error(function(err){
            console.log("row not fetched");
        });
//
    //res.send("data "+useremail+" and password = "+userpass);
   
    
  
});
//
app.use("/v1/sms/xml",function(req,res){
    var useremail = req.param("email");
    var userpass = req.param("password");
    console.log("/v1/sms/xml visted by "+user);
    
    console.log("/v1/sms/xml visted by "+userpass);
    res.send("data "+useremail+" and password = "+userpass);
    
  
});
//
app.listen(2000,function(err,suc){
    if(err){
        console.log("Server not started");
    }
    else{
        console.log("server started");
    }
});
console.log("hello");