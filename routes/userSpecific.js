var express = require("express");
var router = express.Router();
var request = require("request");
const axios = require('axios');
var passport = require("passport");
var promise = require("promise");
var User = require("../models/userModel");
var middleWares = require("../middlewares/index");

const API_KEY = "fPqlQMDMDqFDnUHhNr1vq__LEXSHMUxCc3nYLULklv33jFfC6-1scdyMPlFwwNPLTCJIbV-RRzlqXwcV_-3AQ8l1e5RgVAEQnEJjS8oZzD0FzQIEC9AqXDrFb6R3XXYx";

router.get("/wishlist/:id", middleWares.isLoggedIn, function (req, res) {
    User.findById(req.user._id, function (err, foundUser) {
        if (err)
            console.log(err);
        else {
            if (foundUser.wishlist.includes(req.params.id)) {
                req.flash("error", "I understand you like this restaurent so much, but it's already in your wishlist");
                return res.redirect("/view/" + req.params.id);
            }
            foundUser.wishlist.push(req.params.id);
            foundUser.save();
            req.flash("success", "Yuppiii ! Restaurent added to wishlist");
            res.redirect("/view/" + req.params.id);
        }
    });
});

router.get("/wishlist", middleWares.isLoggedIn, function (req, res) {
    User.findById(req.user._id, function (err, foundUser) {
        if (err)
            console.log(err);
        else {
            var restaurents = [];
            foundUser.wishlist.forEach(function (currentRestro) {
                var searchURL = "https://api.yelp.com/v3/businesses/" + currentRestro;
                var option = {
                    uri: searchURL,
                    headers: {
                        "authorization": "bearer " + API_KEY
                    }
                };
                request(option, function (err, response, body) {
                    if (err)
                        console.log(err);
                    else {
                        restaurents.push(JSON.parse(body));
                    }
                });
            });
            setTimeout(function () {
                res.render("wishlist", {restaurents: restaurents});
            }, 1000);

        }
    });
});

router.post("/wishlist/delete/:id",middleWares.isLoggedIn,function (req,res) {
    User.findById(req.user._id,function (err,foundUser) {
       if(err)
           console.log(err);
       else {
           if(foundUser.wishlist.includes(req.params.id)) {
               foundUser.wishlist.splice(foundUser.wishlist.indexOf(req.params.id), 1);
               foundUser.save();
               req.flash("success", "Restaurant unwishlisted , that wasent a bad choice though");
               res.redirect("/wishlist");
           }
           else {
               req.flash("error", "opps, i think you are trying to remove a restaurant you never liked before");
               res.redirect("/wishlist");
           }
       }
    });
});
module.exports = router;