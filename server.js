const express = require("express")
const app = express();
const bodyParser = require("body-parser");

const https = require("https");

app.use(bodyParser.urlencoded({ extended: true }))


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {
    const city = req.body.Weather;
    const apikey = "8c4a80bd9cceeb0cd856d332e3c76da3"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey + "&units=metric";

    https.get(url, (response) => {
        console.log(response.statusCode);
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather is currently:</p>" + weatherDescription);
            res.write("<h1>The Temparature in " + city + " is: " + temp + " degree Celcius</h1>");
            res.write("<img src=" + iconUrl + ">")
            res.send();
        })
    })
})


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})