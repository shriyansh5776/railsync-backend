import mongoose from "mongoose";
import fs from "fs";
import { configDotenv } from "dotenv";

import Train from "./models/Train.model.js";
import Station from "./models/station.model.js";

configDotenv();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    console.log("Connected to database");

    const stationsData = JSON.parse(
      fs.readFileSync("./data/stations.json", "utf8")
    );

    const trainsData = JSON.parse(
      fs.readFileSync("./data/trains.json", "utf8")
    );

    await Train.deleteMany({});
    await Station.deleteMany({});

    console.log("Old data cleared");

    const stationMap = {};

    let stationCounter = 1000;

    console.log("Creating stations...");

    for (const item of stationsData.features) {
      const p = item.properties;

      if (!p.code || !p.name || !p.state) continue;

      try {
        const station = await Station.create({
          station_code: stationCounter++,
          station_name: p.name,
          city: p.address || p.name,
          state: p.state,
        });

        stationMap[p.code] = station._id;
      } catch (err) {
        console.log(
          `Failed station ${p.name}:`,
          err.message
        );
      }
    }

    console.log(
      `${Object.keys(stationMap).length} stations created`
    );

    console.log("Creating trains...");

    let trainCount = 0;

    for (const item of trainsData.features) {
      const p = item.properties;

      const sourceStation =
        stationMap[p.from_station_code];

      const destinationStation =
        stationMap[p.to_station_code];

      if (!sourceStation || !destinationStation)
        continue;

      let trainType = "express";

      if (
        p.type &&
        p.type.toLowerCase().includes("raj")
      ) {
        trainType = "rajdhani";
      } else if (
        p.type &&
        p.type.toLowerCase().includes("shat")
      ) {
        trainType = "shatabdi";
      } else if (
        p.type &&
        p.type.toLowerCase().includes("super")
      ) {
        trainType = "superfast";
      }

      try {
        await Train.create({
          train_number: Number(p.number),
          train_name: p.name,
          train_type: trainType,
          sourceStation,
          destinationStation,
          totalSeats: 500,
          availableSeats: 500,
        });

        trainCount++;
      } catch (err) {
        console.log(
          `Failed train ${p.number}:`,
          err.message
        );
      }
    }

    console.log(`${trainCount} trains created`);
    console.log("Seeding completed");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedData();