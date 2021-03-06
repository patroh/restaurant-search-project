var express=require("express");
var router=express.Router();
var request=require("request");
const API_KEY="SECRET CALL ROHAN TO GET IT :)";

router.get("/",function (req,res) {
    res.render("home");
});
router.get("/search",function (req,res) {
    const SEARCH_URL="https://api.yelp.com/v3/businesses/search?";
    var term=req.query.query;
    var lat=req.query.lat;
    var lon=req.query.lon;
    var city=req.query.city;
    if(lat=="NA" || lon=="NA" ) {
       // res.send("LOCATION SERVICE NOT AVAILABLE ON DEVICE");
        request({url: "https://api.opencagedata.com/geocode/v1/json?q="+city+"&key=f040af25f685491295bb41387428b66e"}, function (err, response, body) {
            if (err) {
                console.log(err);
            } else {
                const parsedData=JSON.parse(body);
                if(parsedData.results){
                    if(parsedData.results[0]){
                        lat=parsedData.results[0].bounds.northeast.lat;
                        lon=parsedData.results[0].bounds.northeast.lng;
                        console.log(lat+" + "+lon);

                        var option = {
                            url: SEARCH_URL + "term=" + term + "&latitude=" + lat + "&longitude=" + lon + "&limit=50",
                            headers: {
                                "authorization": "bearer " + API_KEY
                            }
                        };
                        request(option, function (err, response, body) {
                            if (err) {
                                console.log(err);
                            } else {
                                //res.send(JSON.parse(body));

                                res.render("restaurents", {restaurents: JSON.parse(body).businesses});
                            }
                        });
                    }
                    else {
                        res.send("CANNOT FIND LAT/LON FOR THE CITY YOU SEARCHED FOR");
                    }
                }
                else {
                    res.send("CANNOT FIND LAT/LON FOR THE CITY YOU SEARCHED FOR");
                }
            }
        });
    }
  else{
    var option = {
        url: SEARCH_URL + "term=" + term + "&latitude=" + lat + "&longitude=" + lon + "&limit=50",
        headers: {
            "authorization": "bearer " + API_KEY
        }
    };
    request(option, function (err, response, body) {
        if (err) {
            console.log(err);
        } else {
            //res.send(JSON.parse(body));

            res.render("restaurents", {restaurents: JSON.parse(body).businesses});
        }
    });
        }
});


module.exports=router;
