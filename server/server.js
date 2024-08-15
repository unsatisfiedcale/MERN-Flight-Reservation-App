const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5001;
const bodyParser = require("body-parser");
const cors = require("cors");

// Route'lar
const flightRoute = require("./routes/flights.js");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB bağlantısı
const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://devyurtsever:a.1234@cluster0.vmoon.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

// Route'ları tanımlama
app.use("/server/flights", flightRoute); // Uçuş verileri için route

// Başlatma
app.listen(port, () => {
  connect();
  console.log(`Server listening on port ${port}`);
});
