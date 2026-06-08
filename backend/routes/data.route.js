import { Router } from "express";
import Station from "../models/station.model.js";
import Train from "../models/Train.model.js";
import Schedule from "../models/Schedule.model.js";

const router = Router();
router.post("/seed", async (req, res) => {
  const stations = [];
  
  for (let i = 1; i <= 100; i++) {
    stations.push({
      station_code: 1000 + i,
      station_name: `Station ${i}`,
      city: `City ${((i - 1) % 20) + 1}`,
      state: `State ${((i - 1) % 10) + 1}`,
    });
  }

  const insertedStations = await Station.insertMany(stations);

  const trains = [];

  const trainTypes = [
    "express",
    "rajdhani",
    "shatabdi",
    "superfast",
  ];

  for (let i = 1; i <= 500; i++) {
    trains.push({
      train_number: 12000 + i,
      train_name: `RailSync Express ${i}`,
      train_type: trainTypes[i % 4],
      sourceStation:
        insertedStations[i % insertedStations.length]._id,
      destinationStation:
        insertedStations[(i + 10) % insertedStations.length]._id,
      totalSeats: 500,
      availableSeats: 500,
    });
  }

  const insertedTrains = await Train.insertMany(trains);

  const schedules = [];

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  insertedTrains.forEach((train, index) => {
    schedules.push({
      trainId: train._id,
      departureTime: 600 + (index % 18) * 100,
      arrivalTime: 1200 + (index % 18) * 100,
      runningDays: days.slice(0, ((index % 7) + 1)),
      distance: 100 + index * 5,
    });
  });

  await Schedule.insertMany(schedules);

  res.json({
    success: true,
    stations: insertedStations.length,
    trains: insertedTrains.length,
    schedules: schedules.length,
  });
});


export default router;