const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})
app.post("/",function(req,res){
    const query = req.body.cityName;
    const url ="https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&units=metric&appid=1c455dbbff8c837c2ee8d4121b26b950#";
   
     https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const wheatherdata = JSON.parse(data);
            const temp = wheatherdata.main.temp;
            const description = wheatherdata.weather[0].description;
            const name = wheatherdata.name;
            const icon = wheatherdata.weather[0].icon;
            const imageurl = " http://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(description);
            console.log(name);
            console.log(temp + " degree celcius ");
            res.write("<p>the wheather is curretly " + description +"</p>");
            res.write("<h1>the temperature in " + name + " is " + temp + " degree celcius</h1>");
            res.write("<img src=" + imageurl + ">");
            res.send();
        })
    }) 
})

app.listen(3000,function(){
    console.log("server is running on port 3000");
})
