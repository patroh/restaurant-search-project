var express=require("express");
var router=express.Router();
var request=require("request");
const API_KEY="fPqlQMDMDqFDnUHhNr1vq__LEXSHMUxCc3nYLULklv33jFfC6-1scdyMPlFwwNPLTCJIbV-RRzlqXwcV_-3AQ8l1e5RgVAEQnEJjS8oZzD0FzQIEC9AqXDrFb6R3XXYx";

router.get("/",function (req,res) {
    res.render("home");
});
router.get("/search",function (req,res) {
    const SEARCH_URL="https://api.yelp.com/v3/businesses/search?";
    var term=req.query.query;
    var lat=req.query.lat;
    var lon=req.query.lon;
    if(lat=="NA" || lon=="NA" )
        res.send("LOCATION SERVICE NOT AVAILABLE ON DEVICE");
    var option={
      url:  SEARCH_URL+"term="+term+"&latitude="+lat+"&longitude="+lon+"&limit=50",
        headers:{
          "authorization":"bearer "+API_KEY
        }
    };
    request(option,function (err,response,body) {
       if(err){
           console.log(err);
       }
       else {
           //res.send(JSON.parse(body));
           res.render("restaurents",{restaurents:JSON.parse(body).businesses});
       }
    });
});


module.exports=router;
