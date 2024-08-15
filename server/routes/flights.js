const Flight = require("../models/flight.js");
const express = require("express");
const axios = require("axios");
const router = express.Router();

// Schiphol API URL ve anahtar
const flightApiUrl = "https://api.schiphol.nl/public-flights/flights";
const appKey = "95c42415409b6a882ef0f61948954005"; // API gizli anahtarı
const appId = "6d8401ed"; // API anahtarı

// Uçuşları almak için endpoint
router.get("/", async (req, res) => {
  try {
    // İstek parametreleri
    const { direction, flightdate } = req.query;
    const response = await axios.get(flightApiUrl, {
      headers: {
        app_id: appId, // API anahtarımı özel başlık altında gönderiyorum
        app_key: appKey, // API gizli anahtarımı özel başlık altında gönderiyorum
        resourceversion: "v4",
        Accept: "application/json",
      },
      params: {
        scheduleDate: flightdate,
        flightDirection: direction, // API'den tüm uçuşları çek
      },
    });
    // API'den alınan veriyi JSON formatında döndür
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching flight data:", error);
    // Hata durumunda 500 durum kodu ile hata mesajı döndür
    res.status(500).send("Error fetching flight data");
  }
});
// Yeni bir uçuş eklemek için endpoint
router.post("/add-flight", async (req, res) => {
  try {
    // İstek gövdesinden yeni uçuş verisini al
    const newFlight = new Flight(req.body);
    // Yeni uçuşu MongoDB veritabanına kaydet
    await newFlight.save();
    // Başarı durumunda mesaj döndür
    res.status(200).json("Flight added successfully!");
  } catch (error) {
    console.error("Error saving flight:", error);
    // Hata durumunda 500 durum kodu ile hata mesajı döndür
    res
      .status(500)
      .json({ message: "Error adding flight", error: error.message });
  }
});
// MongoDB veritabanından tüm uçuşları almak için endpoint
router.get("/get-flight", async (req, res) => {
  try {
    // Veritabanındaki tüm uçuşları al
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (error) {
    console.error("Error fetching flight data from MongoDB:", error);
    res
      .status(500)
      .json({
        message: "Error fetching flight data from MongoDB",
        error: error.message,
      });
  }
});

// Uçuşları silmek için endpoint
router.delete("/delete-flight", async (req, res) => {
  try {
    const { id } = req.body; // Uçuşların kendi `id` değeri

    // Veritabanındaki uçuşları bulmak için `id`'yi kullanarak `_id`'yi bulun
    const flight = await Flight.findOne({ id: id });
    // ID ile veritabanındaki uçuşu bul
    if (!flight) {
      return res.status(404).json({ message: "Flight not found." }); // Uçuş bulunamazsa 404 döndür
    }

    // Uçuşu ID'sine göre veritabanından sil
    await Flight.findByIdAndDelete(flight._id);

    res.status(200).json({ message: "Flight deleted successfully." });
  } catch (error) {
    console.error("Error deleting flight:", error.message);
    res
      .status(500)
      .json({ message: "Error deleting flight", error: error.message });
  }
});

// Router'ı dışa aktarıyoruz, böylece diğer dosyalarda kullanılabilir
module.exports = router;
