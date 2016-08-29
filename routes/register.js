var express = require("express");
var router = express.Router();
var r = require("rethinkdbdash")();
router.get("/",function(req,res){
    if(req.param("register")!=null){
          var usernamer = req.param("username");
          var emailr = req.param("email");
          var passwordr = req.param("password");
       
       
        
        //checking if the user is registered
        r.db("test").table("users").get(emailr).run().then(function(data){
            
        }).error(function(error){
            
        });
        //end
        r.db("test").table("users").insert({email : emailr,username : usernamer , key : passwordr}).run().then(function(data){
        
            
        }).error(function(error){
            console.log(error.first_error+" from error");
        });
       //
    }
    res.render("register",{message : "test"});
 
 
});
module.exports=router;