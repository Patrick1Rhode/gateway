var express = require("express");
var app = express();
var indexp = require(__dirname+"/routes/index.js")
var contactp = require(__dirname+"/routes/contact.js")
var formp = require(__dirname+"/routes/form.js")
var smsjson = require(__dirname+"/routes/smsjson.js")
var smsjxml = require(__dirname+"/routes/smsxml.js")
var registerp = require(__dirname+"/routes/register.js")
var r = require('rethinkdbdash')();
//app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use("/form",formp);
app.use("/register",registerp);
app.use("/index",indexp);
app.use("/contact",contactp);

app.use("/v1/sms/json",smsjson);
app.use("/v1/sms/xml",smsjxml);
app.listen(2000,function(err,suc){
    if(err){
        console.log("Server not started");
    }
    else{
        console.log("server started");
    }
});
console.log("hello");