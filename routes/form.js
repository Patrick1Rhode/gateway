var express = require("express");
var router = express.Router();

router.post("/",function(req,res){
    //res.setHeader('Content-Type', 'application/json');
    res.render("form",{to : "25555555"});
     var phoneNumber = req.query.to;
    //console.log(phoneNumber);
    if(req.query.submit){
         var phoneNumber = req.query.to;
         console.log(phoneNumber);
    var text = req.query.text;
    var from = req.query.from;
    //var submit = req.query.submit;
         
    }
 
});
module.exports=router;