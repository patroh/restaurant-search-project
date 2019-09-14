var express=require("express");
var app=express();
var indexRoutes=require("./routes/indexRoutes");
var restaurentRoutes=require("./routes/restaurentRoutes");

app.set("view engine","ejs");
app.use(express.static(__dirname));
app.use(indexRoutes);
app.use(restaurentRoutes);

// app.listen(3000,function () {
//    console.log("SERVER STARTED PORT 3000");
// });
app.listen(process.env.PORT,process.env.IP);