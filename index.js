var express=require("express");
var app=express();
var passport=require("passport");
var body_parser=require("body-parser");
var LocalStrategy=require("passport-local");
var mongoose = require("mongoose");
var User=require("./models/userModel");
//mongoose.connect("mongodb://localhost/restro");
mongoose.connect("mongodb+srv://patel969:rohan1999@yelpcamp-74fat.mongodb.net/test?retryWrites=true&w=majority");
var indexRoutes=require("./routes/indexRoutes");
var restaurentRoutes=require("./routes/restaurentRoutes");
var authRoutes=require("./routes/authRoutes");
var userSpecificRoutes=require("./routes/userSpecific");

app.use(body_parser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname));
// PASSPORT CONFIGURATION
app.use(require("express-session")({
   secret: "Hello",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});
app.use(indexRoutes);
app.use(restaurentRoutes);
app.use(authRoutes);
app.use(userSpecificRoutes);

var port=process.env.PORT || 3000;
app.get("*",function (req,res) {
   res.render("notfound");
});
app.listen(port,function () {
   console.log("SERVER STARTED : " + port);
});