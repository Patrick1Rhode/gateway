var express = require("express");
var xml = require('xml');
var r = require("rethinkdbdash")();
var router = express.Router();

router.get("/",function(req,res){
    var useremail = req.param("email");
    var sent = {responseId : "Sent", messageSentId : "223555jjkj"};
    var userpass = req.param("password");
    res.set('Content-Type', 'text/xml');
    res.render(sent);
});
    module.exports=router;