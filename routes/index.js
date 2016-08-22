var express = require("express");
var router = express.Router();
router.get("/",function(req,res){
    res.render("index",{name :"Luciscious Kangwa", title : "Index Page"});
});
module.exports = router;