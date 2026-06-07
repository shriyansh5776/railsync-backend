import Train from "../models/Train.model.js";

async function createTrain(req, res) {
  try {
    const {
      train_number,
      sourceStation,
      destinationStation,
      train_type,
      train_name,
      totalSeats,
      availableSeats,
    } = req.body;
    if (!train_number || !sourceStation || !destinationStation||!totalSeats||!availableSeats) {
      return res.status(403).json({
        success: false,
        message: "Enter all the validated fields",
      });
    }
    const requiredTrain = await Train.findOne({ train_number });
    if (requiredTrain) {
      return res.status(403).json({
        success: false,
        message: "Train already exists",
      });
    }
    await Train.create({
      train_number: train_number,
      sourceStation: sourceStation,
      destinationStation: destinationStation,
      train_name: train_name,
      train_type: train_type,
      totalSeats: totalSeats,
      availableSeats: availableSeats,
    });
    return res.status(201).json({
      success: true,
      message: "Train Created",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
}

async function getTrains(req, res) {
  try {
    const trains = await Train.find({}).populate("sourceStation destinationStation");
    return res.status(200).json({
      success: true,
      Trains: trains,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

async function getTrainsById(req, res) {
  try {
    const {id} = req.params;
    const reqTrain = await Train.findById(id).populate("sourceStation destinationStation");
    if (!reqTrain) {
      return res.status(404).json({
        success: false,
        message: "Train id is invalid",
      });
    }
    return res.status(200).json({
      success: true,
      reqTrain,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}
async function getTrainByNumber(req, res) {
  try {
    const number = req.params.trainNumber;
    const reqTrain = await Train.findOne({ train_number: number }).populate("sourceStation destinationStation");
    if (!reqTrain) {
      return res.status(404).json({
        success: false,
        message: "Train not found",
      });
    }
    return res.status(200).json({
      success: true,
      reqTrain,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

async function updateDetails(req, res) {
  try {
    const {
      train_name,
      train_type,
      sourceStation,
      destinationStation,
    } = req.body;
    const number = req.params.trainNumber;
    if (
      !train_name &&
      !train_type &&
      !sourceStation &&
      !destinationStation
    ) {
      return res.status(403).json({
        success: false,
        message: "Provide at least one field to update",
      });
    }
    const reqTrain = await Train.findOne({ train_number: number });
    if (!reqTrain) {
      return res.status(404).json({
        success: false,
        message: "Train not found",
      });
    }
    if (train_name) {
      reqTrain.train_name = train_name;
    }

    if (train_type) {
      reqTrain.train_type = train_type;
    }

    if (sourceStation) {
      reqTrain.sourceStation = sourceStation;
    }

    if (destinationStation) {
      reqTrain.destinationStation = destinationStation;
    }

    await reqTrain.save();
    return res.status(200).json({
      success: true,
      train: reqTrain,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function deleteTrain(req, res) {
  try {
    const trainNumber = req.params.trainNumber;
    const reqTrain = await Train.findOne({ train_number: trainNumber });
    if (!reqTrain) {
      return res.status(404).json({
        success: false,
        message: "Train does not exists",
      });
    }
    await Train.deleteOne({ train_number: trainNumber });
    return res.status(200).json({
      success: true,
      message: "Train deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

async function searchTrain(req, res) {
  try {
    const { source, destination } = req.query;

    if (!source || !destination) {
      return res.status(400).json({
        success: false,
        message: "Source and destination are required",
      });
    }

    const trains = await Train.find({
      sourceStation: source,
      destinationStation: destination,
    }).populate("sourceStation destinationStation");

    if (trains.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No trains found",
      });
    }

    return res.status(200).json({
      success: true,
      trains,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export {
  createTrain,
  getTrains,
  getTrainsById,
  getTrainByNumber,
  updateDetails,
  deleteTrain,
  searchTrain
};
