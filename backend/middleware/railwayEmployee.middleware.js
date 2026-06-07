import User from "../models/User.model.js";

async function isRailwayEmployee(req, res, next) {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "railway_employee") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export default isRailwayEmployee;
