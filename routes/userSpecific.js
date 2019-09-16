var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/userModel");

router.get("/wishlist",function (req,res) {
   res.render("wishlist");
});
module.exports=router;