const express = require("express");
const app = express();
const axios = require("axios");

// Enable cross-origin resource sharing (CORS) 
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

//Request weather data
app.get("/weather", (req, res) => {
  const city = req.query.city;
  if(!city) return res.status(400).json({error: "City is required"});

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a3fa71717d15fe1c55f95f0df9b25905`;
  
  axios
    .get(url)
    .then((response) => {
      const weatherData = {
        name: response.data.name,
        temperature: Math.round(response.data.main.temp),
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
      };
      res.json(weatherData);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});


const PORT = process.env.PORT || 3000;;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

