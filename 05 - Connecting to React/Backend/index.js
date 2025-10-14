require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");

console.log(process.env.PORT);
// 1st param - route, 2nd param - callback function
app.get("/", (req, res) => {
  res.send("Weather API is running!");
});
app.use(cors()); // Enable CORS for all routes
app.get("/api/weather", (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).send("City parameter is required");
  }
  const mockWeatherData = {
    city,
    temperature: "25°C",
    description: "Sunny",
    humidity: "60%",
    windSpeed: "10 km/h",
  };
  res.json(mockWeatherData);
});
app.use((req, res, next) => {
  res.status(200).send("404 - Not Found");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
