var express = require("express");
var router = express.Router();
router.get("/",function(req,res){
    res.render("contact",{message : "I promise to be great"});
});

module.exports = router;