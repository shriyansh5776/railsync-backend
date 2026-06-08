import Station from "../../models/station.model.js";

async function getStation(req, res) {
  try {
    const station = await Station.find({});
    return res.status(200).json({
      success: true,
      station,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

async function getStationById(req, res) {
  try {
    const { station_id } = req.params;
    if (!station_id) {
      return res.status(403).json({
        success: false,
        message: "Invalid Station Id",
      });
    }
    const reqStation = await Station.findById(station_id);
    if (!reqStation) {
      return res.status(404).json({
        success: false,
        message: "Station not found",
      });
    }
    return res.status(200).json({
      success: true,
      station: reqStation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

async function createStation(req, res) {
  try {
    const { station_code, station_name, city, state } = req.body;
    if (!station_code || !station_name || !state || !city) {
      return res.status(400).json({
        success: false,
        message: "Enter all the valid fields",
      });
    }
    const doesExists = await Station.findOne({station_code});
    if (doesExists) {
      return res.status(409).json({
        success: false,
        message: "Station already exists",
      });
    }
    const newStation = await Station.create({
      station_code: station_code,
      station_name: station_name,
      city: city,
      state: state,
    });
    return res.status(200).json({
      success: true,
      message: "Station created",
      newStation
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

async function updateStation(req,res) {
  try {
    const {station_name,city,state}=req.body
    const {station_id} =req.params
    if(!state&&!station_name&&!city){
      return res.status(400).json({
      success: false,
      message: "Please enter valid credentials",
    });
    }
    const station = await Station.findById(station_id)
    if(!station){
      return res.status(404).json({
      success: false,
      message: "Station not found",
    });
    }
     if (station_name) {
      station.station_name = station_name;
    }

    if (city) {
      station.city = city;
    }

    if (state) {
      station.state = state;
    }
    await station.save();
    return res.status(200).json({
      success: true,
      message: "Station updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}
async function deleteStation(req,res) {
  try {
    const {station_id} = req.params
    const doesExist = await Station.findById(station_id)
    if(!doesExist){
      return res.status(404).json({
      success: false,
      message: "Station not found",
    });
    }
    await Station.findByIdAndDelete(station_id);
    return res.status(200).json({
      success: true,
      message: "Station deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}


export { getStation, getStationById,createStation ,updateStation,deleteStation};
