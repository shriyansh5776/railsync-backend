import Schedule from "../../models/Schedule.model.js";
import Train from "../../models/Train.model.js";

async function createSchedule(req, res) {
  try {
    const { trainId, departureTime, arrivalTime, runningDays, distance } =
      req.body;
    if (
      !trainId ||
      !departureTime ||
      !arrivalTime ||
      !runningDays ||
      !distance
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter all validate fields",
      });
    }
    const train = await Train.findById(trainId);
    if (!train) {
      return res.status(404).json({
        success: false,
        message: "Train not found",
      });
    }
    const existingSchedule = await Schedule.findOne({ trainId });
    if (existingSchedule) {
      return res.status(409).json({
        success: false,
        message: "Schedule already exists for this train",
      });
    }
    const newSchedule = await Schedule.create({
      trainId: trainId,
      departureTime: departureTime,
      arrivalTime: arrivalTime,
      runningDays: runningDays,
      distance: distance,
    });
    return res.status(201).json({
      success: true,
      message: "Schedule create Successfully",
      newSchedule
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getScheduleById(req, res) {
  try {
    const { id } = req.params;

    const doesExist = await Schedule.findById(id).populate("trainId");
    if (!doesExist) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      });
    }
    return res.status(200).json({
      success: true,
      doesExist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

async function getScheduleByTrainId(req, res) {
  try {
    const { trainId } = req.params;

    const doesExist = await Schedule.findOne({trainId}).populate("trainId");
    if (!doesExist) {
      return res.status(404).json({
        success: false,
        message: "Train not found",
      });
    }
    return res.status(200).json({
      success: true,
      doesExist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

async function updateSchedule(req, res) {
  try {
    const { departureTime, trainId, arrivalTime, runningDays, distance }=req.body;
    const { id } = req.params;
    if (
      !departureTime &&
      !trainId &&
      !arrivalTime &&
      !runningDays &&
      !distance
    ) {
      return res.status(400).json({
        success: false,
        message: "Enter all credentials",
      });
    }
    const schedule = await Schedule.findById(id);
    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      });
    }
    if (departureTime) {
      schedule.departureTime = departureTime;
    }
    if (arrivalTime) {
      schedule.arrivalTime = arrivalTime;
    }
    if (trainId) {
      schedule.trainId = trainId;
    }
    if (runningDays) {
      schedule.runningDays = runningDays;
    }
    if (distance) {
      schedule.distance = distance;
    }
    await schedule.save();
    return res.status(200).json({
      success: true,
      message: "Schedule updated successfully",
      schedule,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

async function deleteSchedule(req, res) {
  try {
    const {id} = req.params
    const schedule =await Schedule.findById(id);
    if(!schedule){
        return res.status(404).json({
      success: false,
      message: "Schedule not found",
    });
    }
    await Schedule.findByIdAndDelete(id)
    return res.status(200).json({
      success: true,
      message: "Schedule deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}
async function getAllSchedules(req, res) {
  try {
    const { date } = req.query;

    let query = {};

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);

      endDate.setDate(endDate.getDate() + 1);

      query.departureTime = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    const schedules = await Schedule.find(query)
      .populate("trainId")
      .populate("sourceStation")
      .populate("destinationStation");

    return res.status(200).json({
      success: true,
      schedules,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


export {deleteSchedule,updateSchedule,getScheduleById,getScheduleByTrainId,createSchedule,getAllSchedules}
